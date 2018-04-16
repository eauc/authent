"use strict";

const _ = require("lodash");
const axios = require("axios");
const {Router} = require("express");
const jwt = require("jwt-simple");
const speakEasy = require("speakeasy");

const {jwtSecret} = require("../auth");
const {models: {Users}} = require("../db");
const {sendSMS} = require("../sms");

const router = Router();

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
      const code = speakEasy.totp({
        secret: user.code,
        encoding: 'base32'
      });
      sendSMS({
	to: user.phoneNumber,
        message: `Votre code de confirmation est ${code}`,
      }).then(() => {
        res.sendStatus(204);
      }).catch((error) => {
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
      const codeIsValid = speakEasy.totp.verify({
        secret: user.code,
        encoding: 'base32',
        token: code,
        window: 6,
      });
      if (!codeIsValid) {
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
