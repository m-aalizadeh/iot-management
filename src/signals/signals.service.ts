import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { XRaySignal } from '../database/schemas/xray-signal.schema';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';

@Injectable()
export class SignalsService {
  private readonly logger = new Logger(SignalsService.name);

  constructor(
    @InjectModel(XRaySignal.name)
    private readonly xraySignalModel: Model<XRaySignal>,
    private readonly rabbitMQService: RabbitMQService,
  ) {
    this.setupConsumers();
  }

  private setupConsumers() {
    this.rabbitMQService.consumeFromQueue('xray_queue', async (message) => {
      await this.processXRayData(message);
    });
  }

  async processXRayData(rawData: any) {
    try {
      const deviceId = Object.keys(rawData)[0];
      const signalData = rawData[deviceId];

      const dataLength = signalData.data.length;
      const dataVolume = JSON.stringify(signalData).length;

      const firstDataPoint = signalData.data[0][1];
      const coordinates = {
        x: firstDataPoint[0],
        y: firstDataPoint[1],
      };
      const speed = firstDataPoint[2];

      const xraySignal = new this.xraySignalModel({
        deviceId,
        time: signalData.time,
        timestamp: signalData.timestamp || Date.now(),
        dataLength,
        dataVolume,
        coordinates,
        speed,
      });

      await xraySignal.save();
      this.logger.log(`Processed and saved data for device ${deviceId}`);

      await this.rabbitMQService.publishToQueue('processed_queue', {
        deviceId,
        timestamp: xraySignal.timestamp,
        status: 'processed',
      });
    } catch (error) {
      this.logger.error('Error processing X-Ray data', error);
      throw error;
    }
  }

  async findAll() {
    return this.xraySignalModel.find().exec();
  }

  async findByDeviceId(deviceId: string) {
    return this.xraySignalModel.find({ deviceId }).exec();
  }

  async findById(id: string) {
    return this.xraySignalModel.findById(id).exec();
  }

  async delete(id: string) {
    return this.xraySignalModel.findByIdAndDelete(id).exec();
  }

  async getStats() {
    return {
      totalSignals: await this.xraySignalModel.countDocuments(),
      devices: await this.xraySignalModel.distinct('deviceId'),
      averageSpeed: await this.xraySignalModel.aggregate([
        { $group: { _id: null, avgSpeed: { $avg: '$speed' } } },
      ]),
    };
  }
}
