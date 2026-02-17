import PlatformButtons from "../models/PlatformButton.js";

// GET
export const getPlatformButtons = async (req, res) => {
  const data = await PlatformButtons.findOne();
  res.json(data || { buttons: [] });
};

// SAVE
export const savePlatformButtons = async (req, res) => {
  try {
    const { buttons } = req.body;

    if (buttons.length > 5) {
      return res.status(400).json({ msg: "Max 5 allowed" });
    }

    let existing = await PlatformButtons.findOne();

    if (existing) {
      existing.buttons = buttons;
      await existing.save();
      return res.json(existing);
    }

    const created = await PlatformButtons.create({ buttons });
    res.json(created);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
