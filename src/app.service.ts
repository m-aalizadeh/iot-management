import { Injectable, Logger } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly rabbitMQService: RabbitMQService) {}

  async sendTestMessage(): Promise<{ message: string }> {
    const testData = {
      'test-device-123': {
        data: [
          [1000, [51.339764, 12.339223, 1.2]],
          [2000, [51.339777, 12.339211, 1.5]],
        ],
        time: Date.now(),
      },
    };

    try {
      await this.rabbitMQService.publishToQueue('xray_queue', testData);
      this.logger.log('Test message sent to xray_queue');
      return { message: 'Test message sent successfully' };
    } catch (error) {
      this.logger.error('Failed to send test message', error.stack);
      throw new Error('Failed to send test message');
    }
  }

  async getSystemStatus() {
    return {
      app: 'IOT Management',
      status: 'running',
      timestamp: Date.now(),
      queues: ['xray_queue', 'processed_queue'],
    };
  }
}
