import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import "../styles/header.css";

const PLATFORMS = ["instagram", "youtube", "tiktok"];

export default function Header({ platform, setPlatform }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentPlatform =
    platform ||
    PLATFORMS.find(p => location.pathname.includes(p)) ||
    "instagram";

  const handlePlatformClick = (p) => {
    setMobileOpen(false);

    navigate(`/${p}`);

    if (typeof setPlatform === "function") {
      setPlatform(p);
    }
  };


  return (
    <>
      <header className="header container">
        <div className="header-inner">
          {/* LOGO */}
          <div
            className="logo"
            onClick={() => setPlatform("instagram")}
          >

            <span className="dot" />
            BANANA PROMPT
          </div>

          {/* DESKTOP NAV */}
          <nav className="nav desktop-only">
            {PLATFORMS.map(p => (
              <button
                key={p}
                className={`nav-btn ${currentPlatform === p ? "active" : ""}`}
                onClick={() => handlePlatformClick(p)}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="actions">

            <button
              className="menu-btn mobile-only"
              onClick={() => setMobileOpen(true)}
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="mobile-menu">
          <div className="mobile-top">
            <div className="logo">
              <span className="dot" />
              BANANA PROMPTS
            </div>
            <button className="mobile-menu-close" onClick={() => setMobileOpen(false)}>✕</button>
          </div>

          <div className="mobile-links">
            {PLATFORMS.map(p => (
              <button
                key={p}
                className={currentPlatform === p ? "active" : ""}
                onClick={() => handlePlatformClick(p)}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>

        </div>
      )}
    </>
  );
}
