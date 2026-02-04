import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* ===== AUTO CREATE ADMIN ===== */
export const ensureAdmin = async () => {
  const exists = await Admin.findOne({ email: "admin@admin.com" });
  if (!exists) {
    const hash = await bcrypt.hash(" ", 10);
    await Admin.create({ email: "admin@admin.com", password: hash });
    console.log("✅ Default Admin Created");
  }
};

/* ===== LOGIN ===== */
export const login = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(400).json({ msg: "Admin not found" });

  const ok = await bcrypt.compare(password, admin.password);
  if (!ok) return res.status(400).json({ msg: "Wrong password" });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
  res.json({ token });
};
