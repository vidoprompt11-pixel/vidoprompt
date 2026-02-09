import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/video-card.css";

const BASE_URL = "https://api.vidoprompt.com";

export default function VideoCard({ video }) {
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const openDetail = async () => {
    try {
      await fetch(`${BASE_URL}/api/videos/${video._id}/view`, {
        method: "POST",
      });
    } catch (err) {
      console.error(err);
    }

    navigate(`/video/${video._id}`);
  };

  return (
    <div className="video-card" onClick={openDetail}>
      {/* 🎥 VIDEO PREVIEW (NO AUTOPLAY) */}
      <video
        ref={videoRef}
        src={`${BASE_URL}${video.videoUrl}`}
        muted
        playsInline
        preload="metadata"
        poster="/video-poster.jpg"
      />

      <div className="video-overlay">
        <div className="video-title">{video.title}</div>

        <div className="video-actions">
          <span className="views">👁 {video.views || 0}</span>
          <button
            className="ghost-btn"
            onClick={(e) => {
              e.stopPropagation();
              openDetail();
            }}
          >
            View details →
          </button>
        </div>
      </div>
    </div>
  );
}
