const Slot = require('../models/Slot.model');
const sequelize = require('../config/dbConnect');
const { Op } = require('sequelize');

exports.getSlotsByDoctor = async (req, res) => {
  const { doctorId } = req.params;
  const { date } = req.query;

  try {
    const slots = await Slot.findAll({
      where: {
        doctorId,
        isAvailable: true,
        slotDate: {
          [Op.eq]: sequelize.fn('DATE', date)
        }
      }
    });

    if (!slots.length) {
      return res.status(404).json({ message: 'No available slots found for this doctor on the specified date' });
    }
    res.status(200).json(slots);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

