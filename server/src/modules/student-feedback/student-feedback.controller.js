import StudentFeedback from "./student-feedback.model.js";
import { removeFileByUrl } from "../../shared/files/remove-files.js";

export const getAllStudentFeedbacks = async function (req, res) {
  try {
    const feedbacks = await StudentFeedback.find({}).sort({ createdAt: -1 });
    return res.status(200).json(feedbacks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getOneStudentFeedback = async function (req, res) {
  try {
    const id = req.params.id;
    const feedback = await StudentFeedback.findById(id);
    if (!feedback) return res.status(404).json({ message: "NOT FOUND" });
    return res.json(feedback);
  } catch (err) {
    return res.json({ message: "xato" });
  }
};

export const createNewStudentFeedback = async (req, res) => {
  try {
    const { name, surname, feedback, videoFile } = req.body;
    if (!name?.trim() || !surname?.trim() || !feedback?.trim()) {
      return res
        .status(400)
        .json({ message: "Name, surname, and feedback are required." });
    }
    if (!videoFile?.trim()) {
      return res.status(400).json({ message: "Video file is required." });
    }

    const newFeedback = new StudentFeedback({
      name: name.trim(),
      surname: surname.trim(),
      feedback: feedback.trim(),
      videoFile: videoFile.trim(),
    });
    await newFeedback.save();
    return res.status(201).json({
      message: "New Student Feedback Has Been Added!",
      feedback: newFeedback,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateStudentFeedback = async (req, res) => {
  try {
    const currentFeedback = await StudentFeedback.findById(req.params.id);
    if (!currentFeedback) {
      return res.status(404).json({ message: "NOT FOUND!" });
    }

    const nextVideoFile = req.body.videoFile?.trim() || currentFeedback.videoFile;
    if (!req.body.name?.trim() || !req.body.surname?.trim() || !req.body.feedback?.trim()) {
      return res
        .status(400)
        .json({ message: "Name, surname, and feedback are required." });
    }
    if (!nextVideoFile) {
      return res.status(400).json({ message: "Video file is required." });
    }

    const updateFeedback = await StudentFeedback.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name.trim(),
        surname: req.body.surname.trim(),
        feedback: req.body.feedback.trim(),
        videoFile: nextVideoFile,
      },
      { new: true, runValidators: true }
    );

    if (currentFeedback.videoFile && currentFeedback.videoFile !== updateFeedback.videoFile) {
      removeFileByUrl(currentFeedback.videoFile);
    }

    if (!updateFeedback) return res.status(404).json({ message: "NOT FOUND!" });
    return res.status(200).json({
      message: "Student Feedback Has Been Updated!",
      feedback: updateFeedback,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteStudentFeedback = async (req, res) => {
  try {
    const deleteFeedback = await StudentFeedback.findByIdAndDelete(req.params.id);
    if (!deleteFeedback) return res.status(404).json({ message: "NOT FOUND!" });
    removeFileByUrl(deleteFeedback.videoFile);
    return res.status(200).json({ message: "Student Feedback Has Been Deleted!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
