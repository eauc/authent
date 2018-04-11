"use strict";

const _ = require("lodash");
const axios = require("axios");
const {Router} = require("express");
const jwt = require("jwt-simple");

const {jwtSecret} = require("../auth");
const {models: {Users}} = require("../db");

const router = Router();

const SMS_PARAMS = {
  user: process.env.SMS_USER || "Undefined SMS_USER env var",
  pass: process.env.SMS_PASS || "Undefined SMS_PASS env var",
};

router.post("/code", (req, res) => {
  const {body: {email, password}} = req;
  if (!email || !password) {
    console.log("missing ids");
    res.sendStatus(401);
    return;
  }
  Users.findOne({where: {email}})
    .then((user) => {
      if (!user) {
        console.log("user not found");
        res.sendStatus(401);
        return;
      }
      if (!Users.isPassword(user.password, password)) {
        console.log("invalid pass");
        res.sendStatus(401);
        return;
      }
      const code = generateCode();
      Users.update({code}, {where: {id: user.id}})
        .then(() => {
          const options = {
            method: "GET",
            url: "https://smsapi.free-mobile.fr/sendmsg",
            params: Object.assign({}, SMS_PARAMS, {
              msg: `Votre code de confirmation est ${code}`,
            }),
          };
          console.log("Send SMS code", options);
          return axios(options);
        }).then(() => {
          console.log("Success sending SMS");
          res.sendStatus(204);
        }).catch((error) => {
          console.log("Error sending SMS", _.pick(error, "message"));
          res.sendStatus(_.get(error, "response.status", 500));
        });
    })
    .catch((error) => {
      console.log("user not found", error);
      res.sendStatus(401);
    });
});

router.post("/token", (req, res) => {
  const {body: {email, password, code}} = req;
  if (!email || !password || !code) {
    console.log("missing ids");
    res.sendStatus(401);
    return;
  }
  Users.findOne({where: {email}})
    .then((user) => {
      if (!Users.isPassword(user.password, password)) {
        console.log("invalid pass");
        res.sendStatus(401);
        return;
      }
      if (user.code !== code) {
        console.log("invalid code");
        res.sendStatus(401);
        return;
      }
      const payload = {id: user.id};
      res.json({
        token: jwt.encode(payload, jwtSecret)
      });
    })
    .catch((error) => {
      console.log("user not found", error);
      res.sendStatus(401);
    });
});

module.exports = router;

function generateCode () {
  return String("000000" + ((Math.random() * 100000) >> 0)).slice(-6);
}
