import ParentFeedback from "./parent-feedback.model.js";
import { removeFileByUrl } from "../../shared/files/remove-files.js";

export const getAllParentFeedbacks = async function (req, res) {
  try {
    const feedbacks = await ParentFeedback.find({}).sort({ createdAt: -1 });
    return res.status(200).json(feedbacks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getOneParentFeedback = async function (req, res) {
  try {
    const id = req.params.id;
    const feedback = await ParentFeedback.findById(id);
    if (!feedback) return res.status(404).json({ message: "NOT FOUND" });
    return res.json(feedback);
  } catch (err) {
    return res.json({ message: "xato" });
  }
};

export const createNewParentFeedback = async (req, res) => {
  try {
    const { name, surname, feedback, videoFile } = req.body;
    if (!feedback?.trim()) {
      return res.status(400).json({ message: "Feedback is required." });
    }
    if (!videoFile?.trim()) {
      return res.status(400).json({ message: "Video file is required." });
    }

    const newFeedback = new ParentFeedback({
      name: name?.trim() || "",
      surname: surname?.trim() || "",
      feedback: feedback.trim(),
      videoFile: videoFile.trim(),
    });
    await newFeedback.save();
    return res.status(201).json({
      message: "New Parent Feedback Has Been Added!",
      feedback: newFeedback,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateParentFeedback = async (req, res) => {
  try {
    const currentFeedback = await ParentFeedback.findById(req.params.id);
    if (!currentFeedback) {
      return res.status(404).json({ message: "NOT FOUND!" });
    }

    const nextVideoFile = req.body.videoFile?.trim() || currentFeedback.videoFile;
    if (!req.body.feedback?.trim()) {
      return res.status(400).json({ message: "Feedback is required." });
    }
    if (!nextVideoFile) {
      return res.status(400).json({ message: "Video file is required." });
    }

    const updateFeedback = await ParentFeedback.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name?.trim() || "",
        surname: req.body.surname?.trim() || "",
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
      message: "Parent Feedback Has Been Updated!",
      feedback: updateFeedback,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteParentFeedback = async (req, res) => {
  try {
    const deleteFeedback = await ParentFeedback.findByIdAndDelete(req.params.id);
    if (!deleteFeedback) return res.status(404).json({ message: "NOT FOUND!" });
    removeFileByUrl(deleteFeedback.videoFile);
    return res.status(200).json({ message: "Parent Feedback Has Been Deleted!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
