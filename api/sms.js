"use strict";

const _ = require("lodash");
const axios = require("axios");
const twilio = require('twilio');

const SMS_PARAMS = {
  user: process.env.SMS_USER || "Undefined SMS_USER env var",
  pass: process.env.SMS_PASS || "Undefined SMS_PASS env var",
  account: process.env.SMS_ACCOUNT || "Undefined SMS_ACCOUNT env var",
  token: process.env.SMS_TOKEN || "Undefined SMS_TOKEN env var",
  from: process.env.SMS_FROM || "Undefined SMS_FROM env var",
};

const twilioAvailable = Boolean(
  process.env.SMS_ACCOUNT &&
    process.env.SMS_TOKEN &&
    process.env.SMS_FROM);
console.log("SMS", {SMS_PARAMS, twilioAvailable});

module.exports = {
  sendSMS: twilioAvailable ? sendSMSWithTwilio : sendSMSWithFree,
};

function sendSMSWithFree({to, message}) {
  const options = {
    method: "GET",
    url: "https://smsapi.free-mobile.fr/sendmsg",
    params: Object.assign({}, SMS_PARAMS, {
      msg: message,
    }),
  };
  console.log("Send SMS", options);
  return axios(options)
    .then(() => {
      console.log("Success sending SMS");
    }).catch((error) => {
      console.log("Error sending SMS", _.pick(error, "message"));
      return Promise.reject(error);
    });
}

const client = twilioAvailable ? new twilio(SMS_PARAMS.account, SMS_PARAMS.token) : null;

function sendSMSWithTwilio({to, message}) {
  const options = {
    body: message,
    to,
    from: SMS_PARAMS.from,
  };
  console.log("Send SMS", options);
  return client.messages.create(options)
    .then((message) => {
      console.log("Success sending SMS", {message});
    }, (error) => {
      console.log("Error sending SMS", {error});
      return Promise.reject(error);
    });
}
