const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnect');
const Payment = require('./Payment.model');
const User = require('./User.model');

const Transaction = sequelize.define('transactions', {
    transactionRecordId: {
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
    paymentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Payment,
            key: 'paymentId',
        },
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    transactionDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: false,
});

module.exports = Transaction;
