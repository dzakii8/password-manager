'use strict';
const {
  Model
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
      User.hasMany(models.SavedPassword,{
        foreignKey : "userId"
      })
      User.hasOne(models.Order, {
        foreignKey : "userId",
      })
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
      type : DataTypes.STRING,
      defaultValue : "user"
    },
    status: {
      type : DataTypes.STRING,
      defaultValue : "non-premium"
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};