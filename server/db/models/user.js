const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  color: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  friends: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
});

//IDEAS for WEB SECURITY
// use session without a cookie
// pass a token that is stored locally on the front end and passed again when the user makes a request
