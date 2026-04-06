import Course from "../models/course.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAllCourses = async function (req, res) {
  try {
    const titleRegExp = req.query.title ? new RegExp(req.query.title, "i") : /.*/;

    const courses = await Course.find({
      title: titleRegExp,
    });

    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getOneCourse = async function (req, res) {
  try {
    const id = req.params.id;
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "NOT FOUND" });
    return res.json(course);
  } catch (err) {
    return res.json({ message: "xato" });
  }
};

export const createNewCourse = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const course = new Course({
      title,
      description,
      image,
    });
    await course.save();
    return res.status(201).json({
      message: "New Course Has Been Added!",
      course,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const updateCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateCourse) return res.status(404).json({ message: "NOT FOUND!" });
    return res.status(200).json({
      message: "Course Has Been Updated!",
      course: updateCourse,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const deleteCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deleteCourse) return res.status(404).json({ message: "NOT FOUND!" });

    if (deleteCourse.image) {
      const slicedPhoto = deleteCourse.image.slice(30);
      const filePath = path.join(__dirname, "..", "uploads", slicedPhoto);
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

    return res.status(200).json({ message: "Course Has Been Deleted!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
