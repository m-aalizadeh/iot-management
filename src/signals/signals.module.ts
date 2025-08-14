import { Module } from '@nestjs/common';
import { SignalsService } from './signals.service';
import { SignalsController } from './signals.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  XRaySignal,
  XRaySignalSchema,
} from '../database/schemas/xray-signal.schema';
import { RabbitMQModule } from '../rabbitmq/rabbitmq.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: XRaySignal.name,
        schema: XRaySignalSchema,
      },
    ]),
    RabbitMQModule,
  ],
  controllers: [SignalsController],
  providers: [SignalsService],
  exports: [SignalsService],
})
export class SignalsModule {}
