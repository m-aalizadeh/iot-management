import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('System')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('status')
  @ApiOperation({ summary: 'Get system status' })
  @ApiResponse({ status: 200, description: 'System status information' })
  getSystemStatus() {
    return this.appService.getSystemStatus();
  }

  @Post('test-message')
  @ApiOperation({ summary: 'Send a test message to RabbitMQ' })
  @ApiResponse({ status: 201, description: 'Test message sent successfully' })
  async sendTestMessage() {
    return this.appService.sendTestMessage();
  }
}
