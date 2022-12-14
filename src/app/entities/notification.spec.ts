import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create a notification content', () => {
    const notification = new Notification({
      content: new Content('Nova solicitação de amizade!'),
      category: 'social',
      recipientId: 'any-recipient-id',
    });
    expect(notification).toBeTruthy();
  });
});
