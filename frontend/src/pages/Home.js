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

const VALID_PLATFORMS = ["instagram", "youtube", "tiktok", "home"];

const Home = () => {
  const { platform: platformParam } = useParams();
  const navigate = useNavigate();

  const [platform, setPlatform] = useState("instagram");
  const [subCategory, setSubCategory] = useState("");
  const [search, setSearch] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // URL → STATE (home = instagram)
  useEffect(() => {
    if (!platformParam || platformParam === "home") {
      setPlatform("instagram");
    } else if (VALID_PLATFORMS.includes(platformParam)) {
      setPlatform(platformParam);
    } else {
      navigate("/home", { replace: true });
    }

    // reset filters on platform change
    setSubCategory("");
    setSearch("");
  }, [platformParam, navigate]);

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
      <Header />

      <div className="search-container">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      <SubCategoryBar
        platform={platform}
        active={subCategory}
        setActive={setSubCategory}
      />

      {loading ? (
        <Loader />
      ) : (
        <div className="video-grid container">
          {videos.length === 0 ? (
            <p className="no-data">No videos found</p>
          ) : (
            videos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))
          )}
        </div>
      )}

      <Footer />
    </>
  );
};

export default Home;
