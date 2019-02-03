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


    // basic string checking
    // - specific holidays

    if (msg.includes('new') && msg.includes('year')) {
      const current_pusheens = pusheen_imgs['new years'];
      const i = Math.floor(Math.random() * current_pusheens.length);
      const random_pusheen = current_pusheens[i];
      sendImage(senderId, random_pusheen);

    } else if (msg.includes('valentine')) {
      const current_pusheens = pusheen_imgs['valentines'];
      const i = Math.floor(Math.random() * current_pusheens.length);
      const random_pusheen = current_pusheens[i];
      sendImage(senderId, random_pusheen);

    } else if (msg.includes('st') && msg.includes('patrick')) {
      const current_pusheens = pusheen_imgs['valentines'];
      const i = Math.floor(Math.random() * current_pusheens.length);
      const random_pusheen = current_pusheens[i];
      sendImage(senderId, random_pusheen);

    } else if (msg.includes('easter')) {
      const current_pusheens = pusheen_imgs['easter'];
      const i = Math.floor(Math.random() * current_pusheens.length);
      const random_pusheen = current_pusheens[i];
      sendImage(senderId, random_pusheen);

    } else if (msg.includes('mother')) {
      const current_pusheens = pusheen_imgs['mothers'];
      const i = Math.floor(Math.random() * current_pusheens.length);
      const random_pusheen = current_pusheens[i];
      sendImage(senderId, random_pusheen);

    } else if (msg.includes('father')) {
      const current_pusheens = pusheen_imgs['fathers'];
      const i = Math.floor(Math.random() * current_pusheens.length);
      const random_pusheen = current_pusheens[i];
      sendImage(senderId, random_pusheen);

    } else if (msg.includes('thanksgiving')) {
      const current_pusheens = pusheen_imgs['thanksgiving'];
      const i = Math.floor(Math.random() * current_pusheens.length);
      const random_pusheen = current_pusheens[i];
      sendImage(senderId, random_pusheen);

    } else if (msg.includes('christmas')) {
      const current_pusheens = pusheen_imgs['christmas'];
      const i = Math.floor(Math.random() * current_pusheens.length);
      const random_pusheen = current_pusheens[i];
      sendImage(senderId, random_pusheen);

    // dialog flow special returns
    // - ACTIVITY-PUSHEEN
    // - PLACE-PUSHEEN
    // - COSTUME-PUSHEEN
    // - BIRTHDAY-PUSHEEN
    // - HOLIDAY-PUSHEEN
    // - FOOD-PUSHEEN
    // - RANDOM-PUSHEEN

    } else if (result == 'HELP-TEXT') {
      const help_text = "Nya! :3 I'm Pusheen, and I send images and GIFs depending on what you say! \
Ask me questions! Here are the key phrases and words I can understand. :3 \n\n \
Question related: \n - what should I do today / what did you do today / etc. \n \
- where should I go / where did you go / etc. \n - costume / what do you want to be for Halloween \n\n \
Key phrases: \n - birthday \n - holiday \n - specific holiday (e.g. christmas) \n - random (random pusheen!) \n\n \
And, just type 'help' to get this message again! :3";

      sendTextMessage(senderId, help_text);

    } else if (result == 'ACTIVITY-PUSHEEN') {
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

    // for the specific holiday
    } else if (msg.includes('halloween')) {
      const current_pusheens = pusheen_imgs['halloween'];
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

    } else if (result == 'FOOD-PUSHEEN') {
      const current_pusheens = pusheen_imgs['foods'];
      const i = Math.floor(Math.random() * current_pusheens.length);
      const random_pusheen = current_pusheens[i];
      sendImage(senderId, random_pusheen);

    } else if (result == 'RANDOM-PUSHEEN') {
      // select random category
      const i = Math.floor(Math.random() * CATEGORIES.length);
      const current_category = CATEGORIES[i];

      const current_pusheens = pusheen_imgs[current_category];
      const j = Math.floor(Math.random() * current_pusheens.length);
      const random_pusheen = current_pusheens[i];
      sendImage(senderId, random_pusheen);

    } else {
      sendTextMessage(senderId, result);
    }
  });

  apiaiSession.on('error', error => console.log(error));
  apiaiSession.end();
};
