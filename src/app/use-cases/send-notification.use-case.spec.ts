import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications.repository';
import { SendNotificationUseCase } from './send-notification.use-case';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotificationUseCase(
      notificationsRepository,
    );

    const { notification } = await sendNotification.execute({
      content: 'any-content',
      category: 'any-category',
      recipientId: 'any-recipient-id',
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
