import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class XRaySignal extends Document {
  @Prop({ required: true })
  deviceId: string;

  @Prop({ required: true, min: 0 })
  time: number;

  @Prop({ required: true })
  timestamp: number;

  @Prop({ required: true, min: 0 })
  dataLength: number;

  @Prop({ required: true, min: 0 })
  dataVolume: number;

  @Prop({
    type: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
    required: true,
  })
  coordinates: {
    x: number;
    y: number;
  };

  @Prop({ required: true, min: 0 })
  speed: number;
}

export const XRaySignalSchema = SchemaFactory.createForClass(XRaySignal);
