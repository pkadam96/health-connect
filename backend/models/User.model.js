const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnect');
const DoctorDetails = require('./DoctorDetails.model');

const User = sequelize.define('users', {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female', 'Other'),
  },
  dob: {
    type: DataTypes.DATE,
  },
  profilePhoto: {
    type: DataTypes.STRING,
    defaultValue: 'https://www.sunsetlearning.com/wp-content/uploads/2019/09/User-Icon-Grey-300x300.png',
  },
  role: {
    type: DataTypes.ENUM('doctor', 'patient'),
    allowNull: false,
  },
}, {
  timestamps: false,
});

User.hasOne(DoctorDetails, { foreignKey: 'userId', as: 'doctorDetails' });

module.exports = User;
