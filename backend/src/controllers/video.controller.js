import Video from "../models/Video.js";

/* =========================
   UPLOAD VIDEO
========================= */
export const uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "Video file required" });
    }

    const video = await Video.create({
      ...req.body,
      views: req.body.views || 0,
      videoUrl: `/uploads/${req.file.filename}`,

    });


    res.json({ success: true, video });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   GET VIDEOS (FRONTEND)
========================= */
export const getVideos = async (req, res) => {
  try {
    const { platform, search, subCategory } = req.query;

    let filter = {};

    if (platform) {
      filter.platform = platform.toLowerCase();
    }

    if (subCategory) {
      filter.subCategory = subCategory;
    }

    // 🔥 SMART SEARCH (title + prompt + tags)
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { promptTitle: { $regex: search, $options: "i" } },
        { promptText: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } }
      ];
    }

    const videos = await Video.find(filter).sort({ createdAt: -1 });
    res.json(videos);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




export const incrementView = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );

    res.json({ success: true, views: video.views });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.json(video);
  } catch (err) {
    console.error("GET VIDEO BY ID ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
