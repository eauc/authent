"use strict";

const bcrypt = require("bcrypt");

module.exports = (db, DataType) => {
  const Users = db.define("Users", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
	notEmpty: true,
      },
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
	notEmpty: true,
      },
    },
    email: {
      type: DataType.STRING,
      unique: true,
      allowNull: false,
      validate: {
	notEmpty: true,
      },
    },
    phoneNumber: {
      type: DataType.STRING,
      allowNull: true,
      validate: {
	notEmpty: true,
      },
    },
    phoneNumberValidated: {
      type: DataType.BOOLEAN,
      allowNull: false,
    },
    code: {
      type: DataType.STRING,
      allowNull: true,
      validate: {
	notEmpty: true,
      },
    },
  }, {
    hooks: {
      beforeCreate: (user) => {
	const salt = bcrypt.genSaltSync();
	user.password = bcrypt.hashSync(user.password, salt);
      },
    },
  });
  Users.isPassword = (encodedPassword, password) => {
    return bcrypt.compareSync(password, encodedPassword);
  };
  return Users;
};
