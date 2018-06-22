const NOTIFICATION_TYPE = 'REGULAR';

require('dotenv').config();

const { NAME } = process.env;
const { getStartedMessage } = require('./messages');

const sendMessage = (messenger, userId, message) => {
  const { subtitle, imageUrl } = message || {};
  if (subtitle && subtitle === 'image') {
    return messenger.sendImageMessage(userId, imageUrl, NOTIFICATION_TYPE);
  }
  return messenger.sendTextMessage(userId, message, NOTIFICATION_TYPE);
};

const getStarted = async (messenger, userId) => {
  messenger.getUserProfile(userId, (err, profile) => {
    const { first_name: firstName } = profile;
    const message = `Hi ${firstName}! I'm ${NAME}, ${getStartedMessage}`;

    setTimeout(() => {
      messenger.sendTextMessage(userId, message, NOTIFICATION_TYPE);
    }, 2000);
  });
};

module.exports = {
  getStarted,
  sendMessage,
};
