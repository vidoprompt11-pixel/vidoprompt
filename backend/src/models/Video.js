import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    platform: String,
    category: String,
    subCategory: String,
    title: String,
    promptTitle: String,
    promptText: String,
    tags: [String],
    views: Number,
    videoUrl: String,
  },
  { timestamps: true }
);

export default mongoose.model("Video", videoSchema);
