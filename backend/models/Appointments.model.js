const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnect');
const User = require('./User.model');
const Slot = require('./Slot.model');

const Appointment = sequelize.define('appointments', {
  appointmentId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  slotId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Slot,
      key: 'slotId'
    }
  },
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'userId'
    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
    allowNull: false,
    defaultValue: 'pending'
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: false,
});

Appointment.belongsTo(Slot, { foreignKey: 'slotId' });
Appointment.belongsTo(User, { foreignKey: 'patientId', as: 'patient' });

module.exports = Appointment;
