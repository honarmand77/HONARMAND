const { DataTypes , sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    birthdate: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    nationalcode: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      defaultValue: null
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // بررسی معتبر بودن فرمت ایمیل
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    basket: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    likedItems: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    messages: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    itemsTransited: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: 0,
    },
    itemsInTransit: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: 0,
    },
    returnedItems: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: 0,
    },
    comments: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^\d{11}$/ // الگوی 11 رقمی برای شماره موبایل
      },
    },
    accountVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  });

  return User;
};
