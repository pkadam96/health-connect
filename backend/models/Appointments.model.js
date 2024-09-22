const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnect');
const User = require('./User.model');
const Slot = require('./Slot.model');
const Department = require('./Department.model');

const Appointments = sequelize.define('appointment', {
  appointmentId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'userId'
    }
  },
  name: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female', 'Other'),
    allowNull: true
  },
  deptId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Department,
      key: 'deptId'
    }
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'userId'
    }
  },
  appointmentDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  slotId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Slot,
      key: 'slotId'
    }
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Confirmed', 'Cancelled', 'Completed'),
    allowNull: false,
    defaultValue: 'Pending'
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: "appointment",
  timestamps: false,
});

// In Appointments model file (associations)
User.hasMany(Appointments, { foreignKey: 'patientId', as: 'appointments' });
Appointments.belongsTo(User, { as: 'patient', foreignKey: 'patientId' });
Appointments.belongsTo(User, { as: 'doctor', foreignKey: 'doctorId' });
Appointments.belongsTo(Department, { foreignKey: 'deptId' });
Appointments.belongsTo(Slot, { foreignKey: 'slotId' });

module.exports = Appointments;
