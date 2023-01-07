import { Module } from '@nestjs/common';
import { SendNotificationUseCase } from 'src/app/use-cases/send-notification.use-case';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';
import { CancelNotificationUseCase } from '@app/use-cases/cancel-notification.use-case';
import { CountRecipientNotificationUseCase } from '@app/use-cases/count-recipient-notification.use-case';
import { GetRecipientNotificationUseCase } from '@app/use-cases/get-recipients-notifications.use-case';
import { ReadNotificationUseCase } from '@app/use-cases/read-notification.use-case';
import { UnreadNotificationUseCase } from '@app/use-cases/unread-notification.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotificationUseCase,
    CancelNotificationUseCase,
    CountRecipientNotificationUseCase,
    GetRecipientNotificationUseCase,
    ReadNotificationUseCase,
    UnreadNotificationUseCase,
  ],
})
export class HttpModule {}
