const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnect');
const User = require('./User.model');

const Prescription = sequelize.define('prescriptions', {
    prescriptionId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'userId',
    },
  },
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, 
      key: 'userId',
    },
  },
  medication: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dosage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  instructions: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: false,
});

module.exports = Prescription;
