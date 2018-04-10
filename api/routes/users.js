"use strict";

const _ = require("lodash");
const {Router} = require("express");

const {authenticate} = require("../auth");
const {models: {Users}} = require("../db");

const router = Router();

router.route("/:id")
  .all(authenticate)
  .get((req, res) => {
    Users.findById(req.params.id, {
      attributes: ["id", "name", "email", "phoneNumber"]
    }).then((result) => res.json(result))
      .catch((error) => {
        res.status(412).json(_.pick(error, "message"));
      });
  })
  .delete((req, res) => {
    Users.destroy({where: {id: req.params.id} })
      .then((result) => res.sendStatus(204))
      .catch((error) => {
        res.status(412).json(_.pick(error, "message"));
      });
  });

router.post("/", (req, res) => {
  Users.create(req.body)
    .then((result) => res.json(result))
    .catch((error) => {
      res.status(412).json(_.pick(error, "message"));
    });
});

module.exports = router;
