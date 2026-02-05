import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/header.css";

const PLATFORMS = ["instagram", "youtube", "tiktok"];

export default function Header({ platform }) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handlePlatformClick = (p) => {
    setMobileOpen(false);
    navigate(`/${p}`);
  };

  return (
    <>
      <header className="header container">
        <div className="header-inner">

          {/* LOGO */}
          <div className="logo" onClick={() => navigate("/instagram")}>
            <span className="dot" />
            VIDO PROMPT
          </div>

          {/* DESKTOP NAV */}
          <nav className="nav desktop-only">
            {PLATFORMS.map(p => (
              <button
                key={p}
                className={`nav-btn ${platform === p ? "active" : ""}`}
                onClick={() => handlePlatformClick(p)}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </nav>

          {/* MOBILE MENU BTN */}
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
            <div className="logo">
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
            {PLATFORMS.map(p => (
              <button
                key={p}
                className={platform === p ? "active" : ""}
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
