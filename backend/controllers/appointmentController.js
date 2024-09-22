const Appointments = require("../models/Appointments.model");
const Slot = require("../models/Slot.model");

exports.bookAppointment = async (req, res) => {

  const { name, age, gender, deptId, doctorId, appointmentDate, slotId, reason } = req.body;
  const patientId = req.user.userId;

  try {
    if (!patientId || !name || !deptId || !doctorId || !appointmentDate || !slotId) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

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

    selectedSlot.isAvailable = false;
    await selectedSlot.save();

    res.status(201).json(newAppointment);
  }
  catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ message: error.message });
  }
};

