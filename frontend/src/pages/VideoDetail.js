import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import "../styles/video-detail.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BASE_URL = "https://api.vidoprompt.com";

export default function VideoDetail() {
  const { id } = useParams();
  const videoRef = useRef(null);

  const [video, setVideo] = useState(null);
  const [platformButtons, setPlatformButtons] = useState([]);
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(true);

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      try {
        setLoading(true);

        // Fetch Video
        const videoRes = await axios.get(`/videos/${id}`);
        setVideo(videoRes.data);

        // Fetch Buttons
        const btnRes = await axios.get("/platform-buttons");
        setPlatformButtons(btnRes.data?.buttons || []);

      } catch (err) {
        console.error("LOAD ERROR:", err);
      } finally {
        setLoading(false);   // 🔥 THIS WAS MISSING
      }
    };

    loadData();
  }, [id]);

  /* ================= COPY PROMPT ================= */

  const copyPrompt = () => {
    if (!video?.promptText) return;

    navigator.clipboard.writeText(video.promptText);
    setToast("Prompt copied!");

    setTimeout(() => {
      setToast("");
    }, 2000);
  };

  /* ================= LOADING UI ================= */

  if (loading) {
    return (
      <div>
        <Header />
        <div className="detail-wrapper container">
          <p style={{ color: "#fff" }}>Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!video) return null;

  /* ================= UI ================= */

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
            autoPlay
            controls
            playsInline
            preload="auto"
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
          {platformButtons.length > 0 && (
            <div className="try-section">
              <h3 className="try-heading">
                Try this prompt on
              </h3>

              <div className="try-platforms">
                {platformButtons.map((btn, index) => (
                  <a
                    key={index}
                    href={btn.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="try-link"
                  >
                    {btn.name}
                  </a>
                ))}
              </div>
            </div>
          )}

        </div>

        {toast && (
          <div className="toast">
            {toast}
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}
