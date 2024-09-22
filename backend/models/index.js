// models/index.js

const User = require('./User.model');
const Department = require('./Department.model');
const DoctorDetails = require('./DoctorDetails.model');

// Define associations here

Department.hasMany(DoctorDetails, { foreignKey: 'deptId', as: 'doctors' });
DoctorDetails.belongsTo(Department, { foreignKey: 'deptId', as: 'department' });
DoctorDetails.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = {
    User,
    Department,
    DoctorDetails
};
