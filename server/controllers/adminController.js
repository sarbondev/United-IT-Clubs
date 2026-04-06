import Admin from "../models/admin.js";
import bcrypt from "bcrypt";
import generateToken from "../middlewares/generateToken.js";

const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

export const GetAllAdmins = async (_, res) => {
  try {
    const admins = await Admin.find();
    return res.status(200).json(admins);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const GetAdminById = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }
    return res.status(200).json(admin);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const CreateAccount = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const existedAdmin = await Admin.findOne({ email });
    if (existedAdmin) {
      return res.status(400).json({ message: "User already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ name, email, password: hashedPassword });
    await admin.save();

    const token = generateToken({ id: admin._id });

    return res.status(201).json({
      message: "New admin created!",
      admin,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const LoginToAccount = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return sendErrorResponse(
        res,
        401,
        "Admin with this email does not exist."
      );
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return sendErrorResponse(res, 401, "Incorrect email or password.");
    }

    const token = generateToken({ _id: admin._id });

    return res.status(200).json({
      message: "Success!",
      token,
    });
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error.");
  }
};

export const DeleteAccount = async (req, res) => {
  try {
    const removedAdmin = await Admin.findByIdAndDelete(req.params.id);
    res.json({
      data: removedAdmin,
      message: "Admin has been deleted successfully!",
    });
  } catch (err) {
    res.json({ message: err });
  }
};

export const UpdateAccount = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!password) {
      return res.status(400).json({ message: "Password is required!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      { name, email, password: hashedPassword },
      { new: true }
    );
    if (!admin) {
      return res.status(404).json({ message: "Admin not found!" });
    }
    return res.status(200).json({
      message: "Admin updated successfully!",
      admin,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const GetMe = async (req, res) => {
  try {
    const admin = await Admin.findById(req.userInfo.userId);
    if (!admin) return res.status(404).json({ message: "User not found!" });
    return res.status(200).json(admin);
  } catch (error) {
    return res.status(500).json({ message: "user not found" });
  }
};
