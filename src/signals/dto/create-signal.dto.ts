import { ApiProperty } from '@nestjs/swagger';

export class CreateSignalDto {
  deviceId: string;

  time: number;

  coordinates: {
    x: number;
    y: number;
  };

  speed: number;

  @ApiProperty({ required: false })
  timestamp?: number;
}
