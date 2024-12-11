import React, { useEffect, useState } from "react";
import { BrowserRouter as Router,Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SchoolPage from "./pages/SchoolPage";
import DetectPage from "./pages/DetectPage";
import ConsolPage from "./pages/ConsolPage";
import GamePage from "./pages/GamePage";
import SchoolVideo from "./pages/SchoolVideo";
import SchoolQuiz from "./pages/SchoolQuiz";
import Loading from "./components/Loadpage";
import Pretest from "./components/Pretest";
import Aftertest from "./components/Aftertest";

function App() {
  const [title, setTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const location = useLocation();
  const { account } = location.state || {};
  const [isLoading, setIsLoading] = useState(true); // 增加isLoading狀態

  useEffect(() => {
    // 模擬加載時間
    const timeout = setTimeout(() => {
      setIsLoading(false); // 加載完成後將isLoading設為false
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ):(
      <Routes>
        <Route path="/" element={<HomePage />}  />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/schoolpage" element={<SchoolPage account={account}/>} />
        <Route path="/detectpage" element={<DetectPage />} />
        <Route path="/consolpage/:id" element={<ConsolPage />} />
        <Route path="/gamepage" element={<GamePage />} />
        <Route path="/schoolvideo/:topic" element={<SchoolVideo account={account} />} />
        <Route path="/schoolquiz/:topic" element={<SchoolQuiz />} />
        <Route path="/pretest/" element={<Pretest />} />
        <Route path="/Aftertest/" element={<Aftertest />} />
      </Routes>
    )}
      {/* 設置網頁標題和 meta 描述 */}
      {title && <title>{title}</title>}
      {metaDescription && (
        <meta name="description" content={metaDescription} />
        
      )}
    
    </div>
  );
}

export default App;