import mongoose from "mongoose";

const ParentFeedback = new mongoose.Schema(
  {
    name: { type: String },
    surname: { type: String },
    feedback: { type: String, required: true },
    videoFile: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("ParentFeedback", ParentFeedback);
