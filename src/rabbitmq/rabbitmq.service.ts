import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqp-connection-manager';
import { ConfirmChannel } from 'amqplib';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RabbitMQService implements OnModuleInit {
  private readonly logger = new Logger(RabbitMQService.name);
  private connection: amqp.AmqpConnectionManager;
  private channelWrapper: amqp.ChannelWrapper;
  private isConnected = false;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    await this.initialize();
  }

  private async initialize() {
    try {
      const rabbitmqUrl = this.configService.get<string>('RABBITMQ_URL');
      this.connection = amqp.connect([rabbitmqUrl], {
        reconnectTimeInSeconds: 5,
        heartbeatIntervalInSeconds: 60,
      });

      this.connection.on('connect', () => {
        this.logger.log('RabbitMQ connected');
        this.isConnected = true;
      });

      this.connection.on('disconnect', (err) => {
        this.logger.error('RabbitMQ disconnected', err);
        this.isConnected = false;
      });

      this.channelWrapper = this.connection.createChannel({
        json: true,
        setup: async (channel: ConfirmChannel) => {
          await channel.assertQueue('xray_queue', { durable: true });
          await channel.assertQueue('processed_queue', { durable: true });
          this.logger.log('Queues asserted');
        },
      });

      await new Promise<void>((resolve) => {
        this.connection.on('connect', () => resolve());
      });
    } catch (error) {
      this.logger.error('RabbitMQ initialization failed', error);
      throw error;
    }
  }

  async publishToQueue(queue: string, message: any) {
    if (!this.isConnected) {
      await this.initialize();
    }

    try {
      await this.channelWrapper.sendToQueue(
        queue,
        Buffer.from(JSON.stringify(message)),
        // { persistent: true },
      );
      this.logger.log(`Message sent to ${queue}`);
    } catch (error) {
      this.logger.error(`Error publishing to ${queue}`, error);
      throw error;
    }
  }

  async consumeFromQueue(queue: string, callback: (msg: any) => Promise<void>) {
    if (!this.isConnected) {
      await this.initialize();
    }

    try {
      await this.channelWrapper.addSetup(async (channel: ConfirmChannel) => {
        await channel.consume(queue, async (message) => {
          if (message) {
            try {
              const content = JSON.parse(message.content.toString());
              await callback(content);
              channel.ack(message);
            } catch (error) {
              this.logger.error(
                `Error processing message from ${queue}`,
                error,
              );
              channel.nack(message, false, false);
            }
          }
        });
      });
      this.logger.log(`Consumer set up for ${queue}`);
    } catch (error) {
      this.logger.error(`Error setting up consumer for ${queue}`, error);
      throw error;
    }
  }
}
