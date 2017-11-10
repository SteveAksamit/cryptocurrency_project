const Sequelize = require('sequelize')
const db = require('../db')


const Bitcoin = db.define('bitcoin', {
  bitcoinPrice: {
    type: Sequelize.DECIMAL(10, 2),
    unique: false,
    allowNull: true
  },
  date: {
    type: Sequelize.DATEONLY,
    unique: false,
    allowNull: false
  },
  ethereumPrice: {
    type: Sequelize.DECIMAL(10, 2),
    unique: false,
    allowNull: true
  },
  bitcoinPositive: {
    type: Sequelize.INTEGER,
    unique: false,
    allowNull: true
  },
  bitcoinNegative: {
    type: Sequelize.INTEGER,
    unique: false,
    allowNull: true
  },
  bitcoinNeutral: {
    type: Sequelize.INTEGER,
    unique: false,
    allowNull: true
  },
  ethereumPositive: {
    type: Sequelize.INTEGER,
    unique: false,
    allowNull: true
  },
  ethereumNegative: {
    type: Sequelize.INTEGER,
    unique: false,
    allowNull: true
  },
  ethereumNeutral: {
    type: Sequelize.INTEGER,
    unique: false,
    allowNull: true
  },
})


module.exports = Bitcoin

