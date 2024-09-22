const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const DoctorDetails = require('../models/DoctorDetails.model');
const Appointments = require('../models/Appointments.model');
const Department = require('../models/Department.model');
const Slot = require('../models/Slot.model');

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {

  const { firstName, lastName, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName, lastName, email, password: hashedPassword, role
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.userId, firstName: newUser.firstName, lastName: newUser.lastName, email: newUser.email, role: newUser.role
      }
    });
  }
  catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { userId: user.userId, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.userId, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error('Error logging in:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error logging in', error });
  }
};

exports.dashboard = async (req, res) => {
  const userId = req.user.userId;

  try {
    // Fetch user details along with their appointments
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Appointments,
          as: 'appointments',
          include: [
            { model: Department, as: 'department' },
            { model: Slot, as: 'slot' },
            { model: User, as: 'doctor', attributes: ['firstName', 'lastName'] }
          ]
        },
        {
          model: DoctorDetails, as: 'doctorDetails',
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user dashboard:', error);
    res.status(500).json({ message: 'Error fetching user dashboard' });
  }
};

exports.fetchDoctorsByDepartment = async (req, res) => {
  const { deptId } = req.params;

  try {
    const doctors = await DoctorDetails.findAll({
      where: { deptId: deptId },
      include: {
        model: User,
        as: 'user',
        attributes: ['firstName', 'lastName'],
      }
    });

    if (!doctors.length) {
      return res.status(404).json({ message: 'No doctors found for this department' });
    }

    // const doctorNames = doctors.map(doctor => ({
    //   id: doctor.userId, 
    //   name: `${doctor.user.firstName} ${doctor.user.lastName}`
    // }));

    res.status(200).json(doctors);
  } catch (error) {
    console.error('Error fetching doctors by department:', error);
    res.status(500).json({ message: 'Error fetching doctors by department', error });
  }
};


