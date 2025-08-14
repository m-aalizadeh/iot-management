import {
  Controller,
  Get,
  Body,
  Patch,
  Post,
  Param,
  Delete,
} from '@nestjs/common';
import { SignalsService } from './signals.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateSignalDto } from './dto/create-signal.dto';
import { UpdateSignalDto } from './dto/update-signal.dto';
import { XRaySignal } from 'src/database/schemas/xray-signal.schema';
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

  @Post()
  @ApiOperation({ summary: 'Create a new signal' })
  @ApiResponse({
    status: 201,
    description: 'The signal has been successfully created.',
    type: XRaySignal,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createSignalDto: CreateSignalDto) {
    return this.signalsService.create(createSignalDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a signal' })
  @ApiResponse({
    status: 200,
    description: 'The signal has been successfully updated.',
    type: XRaySignal,
  })
  @ApiResponse({ status: 404, description: 'Signal not found' })
  async update(
    @Param('id') id: string,
    @Body() updateSignalDto: UpdateSignalDto,
  ) {
    return this.signalsService.update(id, updateSignalDto);
  }
}
