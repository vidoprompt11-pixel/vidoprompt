import React from "react";
import "../styles/footer.css";
import {
  FaInstagram,
  FaLinkedinIn,
  FaDiscord,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer container">
      <div className="footer-top-line" />

      <div className="footer-content">
        <p className="footer-copy">
          © 2026 <span>Banana Prompts</span>
        </p>

        <div className="footer-links">
          <a href="/terms">Terms</a>
          <a href="/privacy">Privacy</a>
          <a href="/faq">FAQ</a>
          <a href="/">Contact</a>
        </div>

        <div className="footer-social">
          <a href="#"><FaLinkedinIn /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaDiscord /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
