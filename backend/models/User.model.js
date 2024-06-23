const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnect');
const Department = require('./Department.model');

const User = sequelize.define('users', {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
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
  gender: {
    type: DataTypes.STRING,
  },
  dob: {
    type: DataTypes.DATE,
  },
  role: {
    type: DataTypes.ENUM('doctor', 'patient'),
    allowNull: false,
  },
  department_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Department, 
      key: 'deptId'
    }
  }
},{
    timestamps: false,
});

User.belongsTo(Department, { foreignKey: 'department_id' });

module.exports = User;
