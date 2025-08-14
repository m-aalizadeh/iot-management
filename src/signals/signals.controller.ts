import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SignalsService } from './signals.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('signals')
@Controller('signals')
export class SignalsController {
  constructor(private readonly signalsService: SignalsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all signals' })
  @ApiResponse({ status: 200, description: 'List of all signals' })
  findAll() {
    return this.signalsService.findAll();
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get statistics about signals' })
  @ApiResponse({ status: 200, description: 'Signal statistics' })
  getStats() {
    return this.signalsService.getStats();
  }

  @Get('device/:deviceId')
  @ApiOperation({ summary: 'Get signals by device ID' })
  @ApiResponse({ status: 200, description: 'List of signals for the device' })
  findByDeviceId(@Param('deviceId') deviceId: string) {
    return this.signalsService.findByDeviceId(deviceId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get signal by ID' })
  @ApiResponse({ status: 200, description: 'Signal details' })
  findOne(@Param('id') id: string) {
    return this.signalsService.findById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete signal by ID' })
  @ApiResponse({ status: 200, description: 'Signal deleted' })
  remove(@Param('id') id: string) {
    return this.signalsService.delete(id);
  }
}
