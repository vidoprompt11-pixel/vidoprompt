import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/video-card.css";

const BASE_URL = "https://api.vidoprompt.com";

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export default function VideoCard({ video }) {
  const videoRef = useRef(null);
  const navigate = useNavigate();

  // 🔥 AUTOPLAY SAFE (iOS + Android + Desktop)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;
    v.playsInline = true;
    v.preload = "auto";

    const playWhenReady = () => {
      v.play().catch(() => {});
    };

    v.addEventListener("canplay", playWhenReady);

    return () => {
      v.removeEventListener("canplay", playWhenReady);
    };
  }, []);

  const openDetail = async () => {
    try {
      await fetch(`${BASE_URL}/api/videos/${video._id}/view`, {
        method: "POST",
      });
    } catch {}

    navigate(`/video/${video._id}`);
  };

  return (
    <div
      className="video-card"
      onClick={openDetail}
      onMouseEnter={() => {
        if (!isMobile) videoRef.current?.pause();
      }}
      onMouseLeave={() => {
        if (!isMobile) videoRef.current?.play().catch(() => {});
      }}
    >
      <video
        ref={videoRef}
        src={`${BASE_URL}${video.videoUrl}`}
        muted
        loop
        playsInline
        preload="auto"
        className="video-el"
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
