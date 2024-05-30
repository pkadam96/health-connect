const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnect');

const Department = sequelize.define('departments', {
    deptId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    department_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = Department;
