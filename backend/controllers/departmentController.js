const Department = require("../models/Department.model");

exports.departments = async (req, res) => {
    try {
        const departments = await Department.findAll({
            attributes: ['deptId', 'departmentName'],
        });

        if (!departments.length) {
            return res.status(404).json({ message: 'No departments found' });
        }

        res.status(200).json(departments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching departments', error });
    }
};
