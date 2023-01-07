import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';
import { NotificationNotFound } from './errors/notification-not-found.error';
import { makeNotification } from '@test/factories/notification.factory';
import { UnreadNotificationUseCase } from './unread-notification.use-case';

describe('Unread notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotificationUseCase(
      notificationsRepository,
    );

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationsRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a non existing notification ', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotificationUseCase(
      notificationsRepository,
    );

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
