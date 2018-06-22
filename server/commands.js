const rp = require('request-promise-native');
const logger = require('./logger');

require('dotenv').config();

const { NOW_TOKEN, NOW_URI } = process.env;

const options = {
  url: NOW_URI,
  'content-type': 'application/json',
  auth: {
    bearer: NOW_TOKEN,
  },
};

const listDeployments = () => {
  options.method = 'GET';
  return rp(options)
    .then((data) => {
      const { deployments } = JSON.parse(data);
      const list = deployments.map((item, index) => {
        const deployment = `${index + 1}. ${item.name} | ****-****${item.url.substr(-12)} | ${item.scale.max} | ${item.state}`; // eslint-disable-line max-len
        return deployment;
      });
      return list.join('\n');
    })
    .catch((err) => {
      logger.info(`list error: ${err}`);
      return false;
    });
};


module.exports = {
  listDeployments,
};
