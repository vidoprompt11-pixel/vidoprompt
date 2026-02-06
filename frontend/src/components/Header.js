import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import "../styles/header.css";

const PLATFORMS = ["instagram", "youtube", "tiktok"];

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // current path
  const path = location.pathname.replace("/", "");

  // treat /home as instagram
  const activePlatform =
    path === "" || path === "" ? "instagram" : path;

  const handlePlatformClick = (p) => {
    setMobileOpen(false);
    navigate(`/${p}`);
  };

  return (
    <>
      <header className="header container">
        <div className="header-inner">

          {/* LOGO */}
          <div className="logo" onClick={() => navigate("/")}>
            <span className="dot" />
            VIDO PROMPT
          </div>

          {/* DESKTOP NAV */}
          <nav className="nav desktop-only">
            {PLATFORMS.map((p) => (
              <button
                key={p}
                className={`nav-btn ${
                  activePlatform === p ? "active" : ""
                }`}
                onClick={() => handlePlatformClick(p)}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            className="menu-btn mobile-only"
            onClick={() => setMobileOpen(true)}
          >
            ☰
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="mobile-menu">
          <div className="mobile-top">
            <div className="logo" onClick={() => navigate("/home")}>
              <span className="dot" />
              VIDO PROMPT
            </div>
            <button
              className="mobile-menu-close"
              onClick={() => setMobileOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="mobile-links">
            {PLATFORMS.map((p) => (
              <button
                key={p}
                className={activePlatform === p ? "active" : ""}
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
