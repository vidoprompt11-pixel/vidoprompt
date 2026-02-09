import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "../styles/video-detail.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BASE_URL = "https://api.vidoprompt.com";

export default function VideoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const [video, setVideo] = useState(null);
  const [related, setRelated] = useState([]);
  const [showTry, setShowTry] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    fetchVideo();
  }, [id]);

  const fetchVideo = async () => {
    const res = await axios.get(`/videos/${id}`);
    setVideo(res.data);

    const relatedRes = await axios.get("/videos", {
      params: {
        platform: res.data.platform,
        subCategory: res.data.subCategory,
      },
    });

    setRelated(
      relatedRes.data.filter(v => v._id !== id).slice(0, 4)
    );
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(video.promptText);
    setToast("Prompt copied!");
    setTimeout(() => setToast(""), 2000);
  };

  const PLATFORM_URLS = {
    hookup: "https://www.bananaprompts.xyz",
    instagram: "https://www.instagram.com",
    youtube: "https://www.youtube.com",
    tiktok: "https://www.tiktok.com"
  };


  if (!video) return null;


  return (
    <div>
      <Header />
      <div className="detail-wrapper container">
        {/* LEFT VIDEO */}
        <div className="detail-video">
          <video
            ref={videoRef}
            src={`${BASE_URL}${video.videoUrl}`}
            muted
            controls
            playsInline
            preload="metadata"
          />

        </div>

        {/* RIGHT CONTENT */}
        <div className="detail-content">
          <div className="meta">
            👁 {video.views || 0} views
          </div>

          <h1 className="detail-title">
            {video.promptTitle}
          </h1>

          <div className="prompt-box">
            {video.promptText}
          </div>

          <div className="action-row">
            <button className="primary" onClick={copyPrompt}>
              Copy
            </button>

          </div>

          {/* TRY PROMPT SECTION */}
          <div className="try-section">
            <h3 className="try-heading">
              Try this prompt on
            </h3>

            <div className="try-platforms">
              {Object.entries(PLATFORM_URLS).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="try-link"
                >
                  {key.toUpperCase()}
                </a>
              ))}
            </div>
          </div>

        </div>

        {toast && <div className="toast">{toast}</div>}
      </div>

      <Footer />
    </div>
  );
}
