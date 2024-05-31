const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnect');
const Appointment = require('./Appointments.model');
const User = require('./User.model');

const Payment = sequelize.define('payments', {
    paymentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    appointmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Appointment,
            key: 'appointmentId',
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
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    paymentStatus: {
        type: DataTypes.ENUM('pending', 'completed', 'failed'),
        defaultValue: 'pending',
        allowNull: false,
    },
    transactionId: {
        type: DataTypes.STRING,
        unique: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: false,
});

module.exports = Payment;
