"use strict";

const {Router} = require("express");
const jwt = require("jwt-simple");

const {jwtSecret} = require("../auth");
const {models: {Users}} = require("../db");

const router = Router();

router.post("/token", (req, res) => {
  const {body: {email, password}} = req;
  if (!email || !password) {
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
