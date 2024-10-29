'use strict';
const {
  Sequelize, Model, DataTypes
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DBWebServer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  
  DBWebServer.init({
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    dataType: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'data_type'  // snake_case for DB column
    },
    offset: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.0
    },
    startValue: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.0,
      field: 'start_value'
    },
    retain: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    accessible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    write: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    visibleIn: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'visible_in'
    },
    separate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'DBWebServer',
    tableName: 'db_web_server',
    timestamps: true  // Adds createdAt and updatedAt fields
  });

  // Sync the model with the database
  sequelize.sync()
  .then(() => {
    console.log('DBWebServer table has been created, if one didn\'t exist');
    
    // Create initial data based on the image
    DBWebServer.findOrCreate({
      where: { name: 'static_1' },
      defaults: {
        dataType: 'Bool',
        offset: 0.0,
        startValue: false,
        retain: false,
        accessible: true,
        write: true,
        visibleIn: true,
        separate: false
      }
    });

    DBWebServer.findOrCreate({
      where: { name: 'AUTO_MANUAL' },
      defaults: {
        dataType: 'Bool',
        offset: 0.1,
        startValue: false,
        retain: false,
        accessible: true,
        write: true,
        visibleIn: true,
        separate: false
      }
    });

    // Add more initial data as needed...
  })
  .catch(error => {
    console.error('Unable to create table : ', error);
  });

  return DBWebServer;
};