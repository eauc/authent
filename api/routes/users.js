"use strict";

const _ = require("lodash");
const {Router} = require("express");
const qrCode = require("qrcode");
const speakEasy = require("speakeasy");

const {authenticate} = require("../auth");
const {models: {Users}} = require("../db");

const router = Router();

router.route("/me")
  .all(authenticate)
  .get((req, res) => {
    Users.findById(req.user.id, {
      attributes: ["id", "name", "email", "phoneNumber"]
    }).then((result) => res.json(result))
      .catch((error) => {
        res.status(412).json(_.pick(error, "message"));
      });
  })
  .delete((req, res) => {
    Users.destroy({where: {id: req.user.id} })
      .then((result) => res.sendStatus(204))
      .catch((error) => {
        res.status(412).json(_.pick(error, "message"));
      });
  });

// router.route("/:id")
//   .all(authenticate)
//   .get((req, res) => {
//     Users.findById(req.params.id, {
//       attributes: ["id", "name", "email", "phoneNumber"]
//     }).then((result) => res.json(result))
//       .catch((error) => {
//         res.status(412).json(_.pick(error, "message"));
//       });
//   })
//   .delete((req, res) => {
//     Users.destroy({where: {id: req.params.id} })
//       .then((result) => res.sendStatus(204))
//       .catch((error) => {
//         res.status(412).json(_.pick(error, "message"));
//       });
//   });

router.post("/", (req, res) => {
  const secret = speakEasy.generateSecret({length:20});
  const userData = Object.assign(
    {},
    req.body,
    {code: secret.base32}
  );
  console.log("Creating user...", {userData});
  Users.create(userData)
    .then((result) => {
      return qrCode.toDataURL(secret.otpauth_url)
        .then((data_url) => {
          result.dataValues.secret = secret.base32;
          result.dataValues.qrcode = data_url;
          res.json(result);
        });
    })
    .catch((error) => {
      res.status(412).json(_.pick(error, "message"));
    });
});

module.exports = router;
