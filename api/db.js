"use strict";

const Sequelize = require("sequelize");

const config = {
  database: "authent",
  username: "",
  password: "",
  params: {
    dialect: "sqlite",
    storage: "db.sqlite",
    define: {
      underscored: true,
    },
  },
};

const db = new Sequelize(
  config.database,
  config.username,
  config.password,
  config.params
);

const Users = db.import("./models/user");

module.exports = {
  db,
  models: {
    Users,
  },
};
