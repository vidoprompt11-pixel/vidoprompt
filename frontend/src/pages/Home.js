import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SubCategoryBar from "../components/SubCategoryBar";
import VideoCard from "../components/VideoCard";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import "../styles/home.css";
import { Helmet } from "react-helmet";

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

const Home = () => {
  const { platform: platformParam } = useParams();
  const navigate = useNavigate();

  const [platform, setPlatform] = useState("instagram");
  const [subCategory, setSubCategory] = useState("");
  const [search, setSearch] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔓 iOS autoplay unlock
  const [iosUnlocked, setIosUnlocked] = useState(!isIOS);

  // URL → STATE
  useEffect(() => {
    if (!platformParam) {
      setPlatform("instagram");
    } else if (["instagram", "youtube", "tiktok"].includes(platformParam)) {
      setPlatform(platformParam);
    } else {
      navigate("/", { replace: true });
    }

    setSubCategory("");
    setSearch("");
  }, [platformParam, navigate]);

  // iOS first touch unlock
  useEffect(() => {
    if (!isIOS) return;

    const unlock = () => {
      setIosUnlocked(true);
      document.removeEventListener("touchstart", unlock);
    };

    document.addEventListener("touchstart", unlock, { once: true });

    return () => {
      document.removeEventListener("touchstart", unlock);
    };
  }, []);

  // Fetch videos
  useEffect(() => {
    fetchVideos();
  }, [platform, subCategory, search]);

  const fetchVideos = async () => {
    try {
      setLoading(true);

      const params = { platform };
      if (subCategory) params.subCategory = subCategory;
      if (search) params.search = search;

      const res = await axios.get("/videos", { params });
      setVideos(res.data);
    } catch (err) {
      console.error("FETCH VIDEOS ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

     <Helmet>
      <title>
        {platform === "instagram" && "AI Prompts for Instagram Reels"}
        {platform === "tiktok" && "AI Prompts for TikTok Videos"}
        {platform === "youtube" && "AI Prompts for YouTube Shorts"}
      </title>

      <meta
        name="description"
        content={`Best AI prompts for ${platform} videos. Create viral cinematic content using AI prompt generator.`}
      />
    </Helmet>

  
    <h1 style={{ display: "none" }}>
      {platform === "instagram" && "AI Prompts for Instagram Reels"}
      {platform === "tiktok" && "AI Prompts for TikTok Videos"}
      {platform === "youtube" && "AI Prompts for YouTube Shorts"}
    </h1>

    
    <p style={{ display: "none" }}>
      AI prompts for Instagram reels, TikTok videos, and YouTube shorts.
      Generate cinematic, viral and engaging content using AI tools.
    </p>

   
    <div style={{ display: "none" }}>
      <a href="/instagram">AI Prompts for Instagram</a>
      <a href="/tiktok">AI Prompts for TikTok</a>
      <a href="/youtube">AI Prompts for YouTube</a>
    </div>
      
      <Header />

      {/* iOS hint */}
      {isIOS && !iosUnlocked && (
        <div style={{ textAlign: "center", padding: "8px", fontSize: "14px" }}>
          Tap anywhere to enable video previews
        </div>
      )}

      <div className="search-container">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {platform && (
        <SubCategoryBar
          platform={platform}
          active={subCategory}
          setActive={setSubCategory}
        />
      )}

      {loading ? (
        <Loader />
      ) : (
        <div className="video-grid container">
          {videos.length === 0 ? (
            <p className="no-data">No videos found</p>
          ) : (
            videos.map((video) => (
              <VideoCard
                key={video._id}
                video={video}
                iosUnlocked={iosUnlocked}
              />
            ))
          )}
        </div>
      )}

      <Footer />
    </>
  );
};

export default Home;
