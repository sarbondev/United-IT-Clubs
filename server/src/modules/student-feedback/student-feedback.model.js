import mongoose from "mongoose";

const StudentFeedback = new mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    feedback: { type: String, required: true },
    videoFile: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("StudentFeedback", StudentFeedback);