const express = require('express');
const {
  bookAppointment,
  getPatientAppointments,
  cancelAppointment,
  updateAppointmentStatus,
  getAvailableSlots,
  getDoctorsByDepartment,
} = require('../controllers/appointmentController');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

const router = express.Router();

// Book a new appointment (Patient Only)
router.post('/book-appointment', authMiddleware, bookAppointment);

// Get all appointments for a particular patient (Patient Only)
router.get('/patient/:patientId', authMiddleware, roleMiddleware('patient'), getPatientAppointments);

// Cancel an appointment by a patient (Patient Only)
router.put('/cancel-appointment/:appointmentId', authMiddleware, roleMiddleware('patient'), cancelAppointment);

// Approve or cancel an appointment by a doctor (Doctor Only)
router.put('/update-appointment-status/:appointmentId', authMiddleware, roleMiddleware('doctor'), updateAppointmentStatus);

// Get available slots for a doctor (Any authenticated user)
router.get('/available-slots', authMiddleware, getAvailableSlots);

// Get doctors by department (Any authenticated user)
router.get('/doctors/:deptId', authMiddleware, getDoctorsByDepartment);

module.exports = router;
