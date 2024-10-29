'use strict';
const {
  Sequelize, Model, DataTypes
} = require('sequelize');


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
  })
  .catch(error => {
    console.error('Unable to create table : ', error);
  });
  return User;
};