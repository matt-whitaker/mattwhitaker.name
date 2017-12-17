import request from 'request';
import config from 'config';

const {channel, username} = config.get('slack');

const yellow = '#f4f021';
const green = '#019f00';
const red = '#a70005';
const black = '#000000';
const env = process.env.NODE_ENV || 'development';

const makeSlack = (message, color = black) => ({
  attachments: [
    {
      fallback: message,
      text: message,
      channel,
      username,
      color,
      fields: [
        {
          title: 'Environment',
          value: env
        }
      ]
    }
  ]
});

const postSlack = (message, color) => request.post({
  uri: process.env.SLACK_WEBHOOK_URL,
  body: JSON.stringify(makeSlack(message, color))
});

Object.assign(postSlack, {
  colors: {
    yellow,
    green,
    red,
    black
  }
});

export default postSlack;