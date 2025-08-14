import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class XRaySignal extends Document {
  @Prop({ required: true })
  deviceId: string;

  @Prop({ required: true })
  time: number;

  @Prop({ required: true })
  timestamp: number;

  @Prop({ required: true })
  dataLength: number;

  @Prop({ required: true })
  dataVolume: number;

  @Prop({ type: Object })
  coordinates: {
    x: number;
    y: number;
  };

  @Prop({ required: true })
  speed: number;
}

export const XRaySignalSchema = SchemaFactory.createForClass(XRaySignal);
