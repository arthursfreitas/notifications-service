import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';
import { CancelNotificationUseCase } from './cancel-notification.use-case';
import { CountRecipientNotificationUseCase } from './count-recipient-notification.use-case';
import { NotificationNotFound } from './errors/notification-not-found.error';
import { makeNotification } from '@test/factories/notification.factory';

describe('Count recipients notification', () => {
  it('should be able to count a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotificationUseCase(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    const { count: count2 } = await countRecipientNotifications.execute({
      recipientId: 'recipient-2',
    });

    expect(count).toEqual(2);
    expect(count2).toEqual(1);
  });

  it('should not be able to cancel a non existing notification ', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotificationUseCase(
      notificationsRepository,
    );

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
