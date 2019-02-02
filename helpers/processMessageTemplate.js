const API_AI_TOKEN = 'YOUR-API-AI-TOKEN';
const apiAiClient = require('apiai')(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = 'YOUR-FB-ACCESS-TOKEN';
const request = require('request');
const pusheens = require('../pusheen_imgs/pusheens.js')

const pusheen_imgs = pusheens.pusheens;
const CATEGORIES = ['random', 'activities', 'birthday', 'love', 'places', 'holidays', 'costumes', 'foods'];

const sendTextMessage = (senderId, text) => {
  const res = request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    messaging_type: 'MESSAGE_TYPE',
    qs: { access_token: FACEBOOK_ACCESS_TOKEN },
    method: 'POST',
    json: {
      recipient: { id: senderId },
      message: { text },
    }
  });
  // console.log(res.body);
};

const sendImage = (senderId, url) => {
  const res = request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    messaging_type: 'MESSAGE_TYPE',
    qs: { access_token: FACEBOOK_ACCESS_TOKEN },
    method: 'POST',
    json: {
      recipient: { id: senderId },
      message: {
        attachment: {
          type: 'image',
          payload: { url }
        }
      }
    }
  });
  // console.log(res.body);
};


module.exports = (event) => {
  const senderId = event.sender.id;
  const message = event.message.text;
  const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'janibot'});

  // lowercase message for specific holidays
  const msg = message.toLowerCase();

  apiaiSession.on('response', (response) => {
    const result = response.result.fulfillment.speech;

    // dialog flow special returns
    // - ACTIVITY-PUSHEEN
    // - PLACE-PUSHEEN
    // - COSTUME-PUSHEEN
    // - BIRTHDAY-PUSHEEN
    // - HOLIDAY-PUSHEEN
    // - RANDOM-PUSHEEN

    if (result == 'ACTIVITY-PUSHEEN') {
      const current_pusheens = pusheen_imgs['activities'];
      const i = Math.floor(Math.random() * current_pusheens.length);
      const random_pusheen = current_pusheens[i];
      sendImage(senderId, random_pusheen);

    } else if (result == 'PLACE-PUSHEEN') {
      const current_pusheens = pusheen_imgs['places'];
      const i = Math.floor(Math.random() * current_pusheens.length);
      const random_pusheen = current_pusheens[i];
      sendImage(senderId, random_pusheen);

    } else if (result == 'COSTUME-PUSHEEN') {
      const current_pusheens = pusheen_imgs['costumes'];
      const i = Math.floor(Math.random() * current_pusheens.length);
      const random_pusheen = current_pusheens[i];
      sendImage(senderId, random_pusheen);

    } else if (result == 'BIRTHDAY-PUSHEEN') {
      const current_pusheens = pusheen_imgs['birthday'];
      const i = Math.floor(Math.random() * current_pusheens.length);
      const random_pusheen = current_pusheens[i];
      sendImage(senderId, random_pusheen);

    } else if (result == 'HOLIDAY-PUSHEEN') {
      const current_pusheens = pusheen_imgs['holidays'];
      const i = Math.floor(Math.random() * current_pusheens.length);
      const random_pusheen = current_pusheens[i];
      sendImage(senderId, random_pusheen);

    } else if (result == 'LOVE-PUSHEEN') {
      const current_pusheens = pusheen_imgs['love'];
      const i = Math.floor(Math.random() * current_pusheens.length);
      const random_pusheen = current_pusheens[i];
      sendTextMessage(senderId, 'Nya! I love you too! :3');
      sendImage(senderId, random_pusheen);

    } else if (result == 'RANDOM-PUSHEEN') {
      // select random category
      const i = Math.floor(Math.random() * CATEGORIES.length);
      const current_category = CATEGORIES[i];

      const current_pusheens = pusheen_imgs[current_category];
      const j = Math.floor(Math.random() * current_pusheens.length);
      const random_pusheen = current_pusheens[i];
      sendImage(senderId, random_pusheen);

    // TODO basic string checking
    // - specific holidays

    } else {
      sendTextMessage(senderId, result);
    }
  });

  apiaiSession.on('error', error => console.log(error));
  apiaiSession.end();
};
