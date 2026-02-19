import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import VideoDetail from "./pages/VideoDetail";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Faq from "./pages/Faq";
import AiVideoPromptGeneratorPage from "./pages/AiVideoPromptGeneratorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ROOT = INSTAGRAM */}
        <Route path="/" element={<Home />} />

        <Route
          path="/ai-video-prompt-generator"
          element={<AiVideoPromptGeneratorPage />}></Route>


        {/* PLATFORM ROUTE */}
        <Route path="/:platform" element={<Home />} />

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
