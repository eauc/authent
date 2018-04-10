"use strict";

const {Router} = require("express");
const authRouter = require("./auth");
const usersRouter = require("./users");

const router = Router();

router.get("/", (req, res) => {
  res.json({
    auth: {
      token: {POST: "create user token"},
    },
    users: {
      POST: "create user",
      ":id": {
	GET: "access user",
	DELETE: "drop user",
      },
    },
  });
});

router.use("/auth", authRouter);
router.use("/users", usersRouter);

module.exports = router;
