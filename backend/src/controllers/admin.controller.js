import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "../config/db.js";

/* ===== LOGIN ===== */
export const login = async (req, res) => {
  try {
    await connectDB(); // 🔥 THIS FIXES VERCEL TIMEOUT

    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ msg: "Admin not found" });
    }

    const ok = await bcrypt.compare(password, admin.password);
    if (!ok) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
