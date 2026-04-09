import Team from "./team.model.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAllMembers = async (_, res) => {
  try {
    const staffs = await Team.find();
    return res.json(staffs);
  } catch (err) {
    return res.json({ message: err });
  }
};

export const getOneMembers = async (req, res) => {
  try {
    const staff = await Team.findById(req.params.id);
    if (!staff) return res.json({ message: "Xodim topilmadi" });
    return res.json(staff);
  } catch (err) {
    return res.json({ message: err });
  }
};

export const createMember = async (req, res) => {
  const { name, job, image } = req.body;
  try {
    const newStaff = new Team({ name, job, image });
    await newStaff.save();
    return res.json({
      staff: newStaff,
      message: "Yangi xodim qo'shildi",
    });
  } catch (err) {
    return res.json({ message: err });
  }
};

export const updateMember = async (req, res) => {
  try {
    const staff = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!staff) return res.json({ message: "Xodim topilmadi" });
    return res.json({ staff, message: "Xodim yangilandi" });
  } catch (err) {
    return res.json({ message: err });
  }
};

export const deleteMember = async (req, res) => {
  try {
    const staff = await Team.findByIdAndDelete(req.params.id);
    if (!staff) return res.json({ message: "Xodim topilmadi" });
    if (staff.image) {
      const slicedPhoto = staff.image.slice(30);
      const filePath = path.join(__dirname, "..", "..", "..", "uploads", slicedPhoto);
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        } else {
          console.warn(`File not found: ${filePath}`);
        }
      } catch (err) {
        console.error(`Failed to delete image: ${filePath}`, err);
      }
    }
    return res.json({ staff, message: "Xodim o'chirildi" });
  } catch (err) {
    return res.json({ message: err });
  }
};
