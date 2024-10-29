'use strict';
const {
  Sequelize, Model, DataTypes
} = require('sequelize');

var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var session = require('express-session');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  
  // Create a new Sequelize instance
  // const sequelize = new Sequelize('database', 'username', 'password', {
  //   host: 'localhost',
  //   dialect: 'mysql'
  // });
  // Sync the model with the database
  sequelize.sync()
  .then(() => {
    console.log('User table has been created, if one didn\'t exist');

    // Create admin user if it doesn't exist
    // admin / admin
    // User.destroy({ where: { email: 'admin' } });
    const password = bcrypt.hashSync('admin', 10);
    User.findOrCreate({
      where: { email: 'admin' },
      defaults: {
        firstName: 'Admin',
        lastName: 'Admin User',
        username: 'admin',
        password: password,
      }
    });
  })
  .catch(error => {
    console.error('Unable to create table : ', error);
  });
  return User;
};