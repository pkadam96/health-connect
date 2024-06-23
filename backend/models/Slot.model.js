const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnect');
const User = require('./User.model');

const Slot = sequelize.define('slots', {
    slotId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    slotDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'userId'
      }
    }
  }, {
    timestamps: false,
});

Slot.belongsTo(User, { foreignKey: 'doctorId', as: 'doctor' });

module.exports = Slot;
