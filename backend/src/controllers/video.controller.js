import Video from "../models/Video.js";

// UPLOAD
export const uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "Video required" });
    }

    const video = await Video.create({
      ...req.body,
      views: 0,
      videoUrl: `/media/${req.file.filename}`,
    });

    res.json({ success: true, video });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
export const getVideos = async (req, res) => {
  try {
    const { platform, subCategory, search } = req.query;
    let filter = {};

    if (platform) filter.platform = platform;
    if (subCategory) filter.subCategory = subCategory;

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { promptTitle: { $regex: search, $options: "i" } },
        { promptText: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const videos = await Video.find(filter).sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// VIEW COUNT
export const incrementView = async (req, res) => {
  const video = await Video.findByIdAndUpdate(
    req.params.id,
    { $inc: { views: 1 } },
    { new: true }
  );
  res.json({ success: true, views: video.views });
};

// SINGLE VIDEO
export const getVideoById = async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video) return res.status(404).json({ msg: "Not found" });
  res.json(video);
};
