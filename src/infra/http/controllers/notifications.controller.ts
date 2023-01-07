import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotificationUseCase } from '@app/use-cases/send-notification.use-case';
import { CreateNotificationBodyDto } from '../dtos/create-notification-body.dto';
import { NotificationViewModel } from '../view-models/notification.view-model';
import { CancelNotificationUseCase } from '@app/use-cases/cancel-notification.use-case';
import { ReadNotificationUseCase } from '@app/use-cases/read-notification.use-case';
import { UnreadNotificationUseCase } from '@app/use-cases/unread-notification.use-case';
import { CountRecipientNotificationUseCase } from '@app/use-cases/count-recipient-notification.use-case';
import { GetRecipientNotificationUseCase } from '@app/use-cases/get-recipients-notifications.use-case';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotificationUseCase: SendNotificationUseCase,
    private cancelNotificationUseCase: CancelNotificationUseCase,
    private readNotificationUseCase: ReadNotificationUseCase,
    private unreadNotificationUseCase: UnreadNotificationUseCase,
    private countRecipientNotificationUseCase: CountRecipientNotificationUseCase,
    private getRecipientNotificationUseCase: GetRecipientNotificationUseCase,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotificationUseCase.execute({ notificationId: id });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotificationUseCase.execute({
      recipientId,
    });
    return { count };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } =
      await this.getRecipientNotificationUseCase.execute({
        recipientId,
      });
    return { notifications: notifications.map(NotificationViewModel.toHTTP) };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotificationUseCase.execute({ notificationId: id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotificationUseCase.execute({ notificationId: id });
  }

  @Post()
  async create(@Body() body: CreateNotificationBodyDto) {
    const { recipientId, category, content } = body;

    const { notification } = await this.sendNotificationUseCase.execute({
      recipientId,
      category,
      content,
    });

    return { notification: NotificationViewModel.toHTTP(notification) };
  }
}
