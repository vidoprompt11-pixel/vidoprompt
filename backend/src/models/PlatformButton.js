import mongoose from "mongoose";

const buttonSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
  },
  { _id: false }
);

const platformSchema = new mongoose.Schema(
  {
    buttons: {
      type: [buttonSchema],
      validate: [
        arr => arr.length <= 5,
        "Maximum 5 buttons allowed",
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("PlatformButtons", platformSchema);
