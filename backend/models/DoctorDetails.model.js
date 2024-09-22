const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnect');
const User = require('./User.model');
const Department = require('./Department.model');

const DoctorDetails = sequelize.define('doctorDetails', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: 'userId'
        },
        onDelete: 'CASCADE',
    },
    qualifications: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    experience: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    about: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    ratings: {
        type: DataTypes.DECIMAL(2, 1),
        allowNull: true,
        defaultValue: null,
    },
    specialization: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    deptId: {
        type: DataTypes.INTEGER,
        references: {
            model: Department,
            key: 'deptId'
        },
        onDelete: 'SET NULL',
        allowNull: true,
    },
}, {
    timestamps: false,
});

module.exports = DoctorDetails;
