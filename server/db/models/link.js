const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('link', {
  url: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isURL: true
    }
  },
  sender: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  receiver: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  message: {
    type: Sequelize.TEXT
  }
});
