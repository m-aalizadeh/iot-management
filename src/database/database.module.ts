import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { XRaySignal, XRaySignalSchema } from './schemas/xray-signal.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: XRaySignal.name, schema: XRaySignalSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
