const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  price: {
    type: Sequelize.DECIMAL(10,2),
    unique: false,
    allowNull: false
  }
})

module.exports = Bitcoin


