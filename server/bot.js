require('dotenv').config();

const commands = require('./commands');
const { keywordInvalid, cantUnderstand } = require('./messages');

const KEYWORDS = [
  '/ls',
];

const KEYWORD_PATTERN = /^(\/([a-zA-Z]+))/;

const replyTextMessage = (messenger, userId, userMessage) => {
  const tempKeyword = userMessage.toLowerCase();
  const isKeyword = KEYWORD_PATTERN.test(tempKeyword);
  const isValidKeyword = isKeyword ? KEYWORDS.includes(tempKeyword) : false;

  const list = tempKeyword.includes('/ls');

  if (isKeyword && !isValidKeyword) {
    return new Promise(resolve => resolve(keywordInvalid));
  }

  if (list) return commands.listDeployments();

  return new Promise(resolve => resolve(cantUnderstand));
};

module.exports = {
  replyTextMessage,
};
