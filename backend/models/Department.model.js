const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnect');

const Department = sequelize.define('department', {
    deptId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    departmentName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'department',
    timestamps: false,
});

module.exports = Department;
