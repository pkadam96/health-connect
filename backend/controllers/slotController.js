const Slot = require('../models/Slot.model');

// Create a new slot (Doctor Only)
exports.createSlot = async (req, res) => {
  try {
    const { slotDate, startTime, endTime } = req.body;
    const doctorId = req.user.userId; 

    const slot = await Slot.create({
      slotDate,
      startTime,
      endTime,
      doctorId
    });

    res.status(201).json({ message: 'Slot created successfully', slot });
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all slots for a particular doctor
exports.getSlotsByDoctor = async (req, res) => {
  try {
    const doctorId = req.user.userId; // Assuming req.user contains authenticated user info

    const slots = await Slot.findAll({ where: { doctorId } });

    res.status(200).json(slots);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a slot (Doctor Only)
exports.updateSlot = async (req, res) => {
  try {
    const { slotId } = req.params;
    const { slotDate, startTime, endTime, isAvailable } = req.body;
    const doctorId = req.user.userId; // Assuming req.user contains authenticated user info

    const slot = await Slot.findOne({ where: { slotId, doctorId } });
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    slot.slotDate = slotDate;
    slot.startTime = startTime;
    slot.endTime = endTime;
    slot.isAvailable = isAvailable;
    await slot.save();

    res.status(200).json({ message: 'Slot updated successfully', slot });
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a slot (Doctor Only)
exports.deleteSlot = async (req, res) => {
  try {
    const { slotId } = req.params;
    const doctorId = req.user.userId; // Assuming req.user contains authenticated user info

    const slot = await Slot.findOne({ where: { slotId, doctorId } });
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    await slot.destroy();

    res.status(200).json({ message: 'Slot deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
