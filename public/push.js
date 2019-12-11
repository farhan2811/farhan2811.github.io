var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BM6fhKXNFZa6kQCbieR8_tij7j72b0fs0DDsUS5r1vRHXrqKhptp7mTUM41dMQx0W5tA0k-vujZ_hnhtxaRIh1g",
   "privateKey": "Z4y4wOScSpGBtCbk8BHSPZIYIkljidxZJq-5kQHf_gA"
};
 
 
webPush.setVapidDetails(
   'mailto:farhan.naufaldy2811@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/csgxQZmVjs0:APA91bE7fCMA0gvVvu-_AvbU3--a5SpTA88dtdSHu21C4DSI2bMsKmiVoGNcO2TKt7krfSIhUyWadGcfatRvoDUOak58jX_4-_spbr_5Pa_3uG1cmGugmwsG3NkAQBvB8MM-nFqFtsyB",
   "keys": {
       "p256dh": "BNYczeZ1lKdeln9bC49iLzpzqFYiCZAkanmRTPJ7ZznigLmUkajuTkqM8r224amUKsUZY39mHYai9iZb77Q6g20=",
       "auth": "DJQMbUzyB6IQoYizMVQ8eg=="
   }
};
var payload = 'Dapatkan berita bola terupdate!';
 
var options = {
   gcmAPIKey: '937313850733',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);