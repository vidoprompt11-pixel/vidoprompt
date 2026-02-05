import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "../api/axios";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SubCategoryBar from "../components/SubCategoryBar";
import VideoCard from "../components/VideoCard";
import Loader from "../components/Loader";
import "../styles/home.css";
import Footer from "../components/Footer";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [platform, setPlatform] = useState(
    searchParams.get("platform") || "instagram"
  );
  const [subCategory, setSubCategory] = useState("");
  const [search, setSearch] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sync platform from URL → state
  useEffect(() => {
    const p = searchParams.get("platform");
    if (p && p !== platform) {
      setPlatform(p);
    }
  }, [searchParams]);

  const changePlatform = (p) => {
    setPlatform(p);
    setSearchParams({ platform: p });
  };



  useEffect(() => {
    fetchVideos();
  }, [platform, subCategory, search]);

  const fetchVideos = async () => {
    try {
      setLoading(true);

      const params = {
        platform,
      };

      if (subCategory) params.subCategory = subCategory;
      if (search) params.search = search;

      const res = await axios.get("/videos", { params });
      setVideos(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header platform={platform} setPlatform={changePlatform} />



      <div className="search-container">
        <SearchBar
          value={search}
          onChange={setSearch}
        />
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
          {videos.map(video => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}

      <Footer />
    </>
  );
};

export default Home;
