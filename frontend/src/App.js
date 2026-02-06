import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import VideoDetail from "./pages/VideoDetail";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Faq from "./pages/Faq";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ROOT → HOME */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* HOME (Instagram content) */}
        <Route path="/home" element={<Home />} />

        {/* PLATFORM PAGES */}
        <Route path="/instagram" element={<Home />} />
        <Route path="/youtube" element={<Home />} />
        <Route path="/tiktok" element={<Home />} />

        {/* OTHER PAGES */}
        <Route path="/video/:id" element={<VideoDetail />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/faq" element={<Faq />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
