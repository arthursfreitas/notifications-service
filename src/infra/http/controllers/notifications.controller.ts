import { Body, Controller, Post } from '@nestjs/common';
import { SendNotificationUseCase } from 'src/app/use-cases/send-notification.use-case';
import { CreateNotificationBodyDto } from '../dtos/create-notification-body.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotificationUseCase: SendNotificationUseCase) {}
  @Post()
  async create(@Body() body: CreateNotificationBodyDto) {
    const { recipientId, category, content } = body;

    const { notification } = await this.sendNotificationUseCase.execute({
      recipientId,
      category,
      content,
    });

    return { notification };
  }
}
