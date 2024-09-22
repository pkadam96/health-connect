const Appointments = require("../models/Appointments.model");
const Slot = require("../models/Slot.model");
const User = require('../models/User.model');
const Department = require('../models/Department.model');

// Book a new appointment (Patient Only)
exports.bookAppointment = async (req, res) => {
  const { name, age, gender, deptId, doctorId, appointmentDate, slotId, reason } = req.body;
  const patientId = req.user.userId;
  try {
    if (!patientId || !name || !deptId || !doctorId || !appointmentDate || !slotId) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    // Create the appointment
    const newAppointment = await Appointments.create({
      patientId,
      name,
      age,
      gender,
      deptId,
      doctorId,
      appointmentDate,
      slotId,
      reason
    });

    const selectedSlot = await Slot.findByPk(slotId);
    if (!selectedSlot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    // Set isAvailable to false
    selectedSlot.isAvailable = false;
    await selectedSlot.save();

    // Respond with the created appointment
    res.status(201).json(newAppointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ message: error.message });
  }
};



// const appointmentDetails = await Appointment.findOne({
//   where: { appointmentId: appointment.appointmentId },
//   include: [
//     {
//       model: Slot,
//       as: 'slot',
//       attributes: ['slotDate', 'startTime', 'endTime'],
//       include: [
//         {
//           model: User,
//           as: 'doctor',
//           attributes: ['name'],
//           include: [
//             {
//               model: Department,
//               as: 'department',
//               attributes: ['department_name']
//             }
//           ]
//         }
//       ]
//     },
//   ]
// });

// const {
//   appointmentId,
//   slot: {
//     slotDate,
//     startTime,
//     endTime,
//     doctor: {
//       name: doctorName,
//       department: { department_name: departmentName }
//     }
//   }
// } = appointmentDetails;

// const simplifiedAppointment = {
//   appointmentId,
//   slotDate,
//   startTime,
//   endTime,
//   doctorName,
//   departmentName
// };



// Get all appointments for a patient
exports.getPatientAppointments = async (req, res) => {
  const { patientId } = req.params;

  try {
    const appointments = await Appointment.findAll({
      where: { patientId },
      include: [
        {
          model: Slot,
          as: 'slot',
          attributes: ['slotDate', 'startTime', 'endTime'],
          include: [
            {
              model: User,
              as: 'doctor',
              attributes: ['name'],
              include: [
                {
                  model: Department,
                  as: 'department',
                  attributes: ['departmentName']
                }
              ]
            }
          ]
        }
      ]
    });

    // Simplify appointments structure
    const simplifiedAppointments = appointments.map(appointment => ({
      appointmentId: appointment.appointmentId,
      slotDate: appointment.slot.slotDate,
      startTime: appointment.slot.startTime,
      endTime: appointment.slot.endTime,
      doctorName: appointment.slot.doctor.name,
      departmentName: appointment.slot.doctor.department.department_name,
      status: appointment.status,
      reason: appointment.reason,
      notes: appointment.notes
    }));

    res.status(200).json({ appointments: simplifiedAppointments });
  }
  catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
};


// Cancel an appointment by a patient
exports.cancelAppointment = async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const appointment = await Appointment.findByPk(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (appointment.status === 'cancelled' || appointment.status === 'completed') {
      return res.status(400).json({ message: 'Appointment cannot be cancelled' });
    }

    appointment.status = 'cancelled';
    await appointment.save();

    // Mark the slot as available
    const slot = await Slot.findByPk(appointment.slotId);
    slot.isAvailable = true;
    await slot.save();

    res.status(200).json({ message: 'Appointment cancelled successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling appointment', error });
  }
};

// Approve or cancel an appointment by a doctor
exports.updateAppointmentStatus = async (req, res) => {
  const { appointmentId } = req.params;
  const { status } = req.body;

  try {
    const appointment = await Appointment.findByPk(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (status !== 'confirmed' && status !== 'cancelled') {
      return res.status(400).json({ message: 'Invalid status' });
    }

    appointment.status = status;
    await appointment.save();

    if (status === 'cancelled') {
      // Mark the slot as available
      const slot = await Slot.findByPk(appointment.slotId);
      slot.isAvailable = true;
      await slot.save();
    }

    res.status(200).json({ message: 'Appointment status updated successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Error updating appointment status', error });
  }
};

// Get available slots for a doctor
exports.getAvailableSlots = async (req, res) => {
  const { doctorId, date } = req.query;

  try {
    const slots = await Slot.findAll({
      where: {
        doctorId,
        slotDate: date,
        isAvailable: true,
      },
    });

    res.status(200).json({ slots });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching slots', error });
  }
};

// Get doctors by department
exports.getDoctorsByDepartment = async (req, res) => {
  const { deptId } = req.params;

  try {
    const doctors = await User.findAll({
      where: { deptId: deptId, role: 'doctor' },
    });

    res.status(200).json({ doctors });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors', error });
  }
};
