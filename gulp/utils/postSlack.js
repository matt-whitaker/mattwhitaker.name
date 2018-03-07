import R from 'ramda';
import Promise from 'bluebird';
import request from 'request-promise';

const yellow = '#f4f021';
const green = '#019f00';
const red = '#a70005';
const black = '#000000';
const env = process.env.NODE_ENV || 'development';

const ifEnabled = R.ifElse(() => !process.env.SLACK_WEBHOOK_URL, () => Promise.resolve());

const makeSlack = (message, color = black) => ({
  attachments: [
    {
      fallback: message,
      text: message,
      channel: process.env.SLACK_CHANNEL,
      username: process.env.SLACK_USERNAME,
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

const postSlack = ifEnabled((message, color) => request.post({
  uri: process.env.SLACK_WEBHOOK_URL,
  body: JSON.stringify(makeSlack(message, color))
}).promise());

Object.assign(postSlack, {
  colors: {
    yellow,
    green,
    red,
    black
  }
});

export default postSlack;