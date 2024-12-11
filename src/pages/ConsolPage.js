import React, { useCallback } from "react";
import InnerFrame from "../components/InnerFrame";
import BkFrame2 from "../components/BkFrame2";
import { useNavigate, useParams } from "react-router-dom";
import "./ConsolPage.css";

const ConsolPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // 获取路由参数中的 id

  const onTeacherImageClick = useCallback(() => {
    navigate("/homepage");
  }, [navigate]);

  return (
    <div className="consolpage">
      <img className="bkground-icon3" alt="" 
        src={`${process.env.PUBLIC_URL}/bkground@2x.png`} 
        />
      <InnerFrame prop="皮膚辨識" />
      <div className="text-container-parent">
        <div className="text-container">
          <BkFrame2 selectedId={id} /> {/* 将 id 作为 selectedId 传递给 BkFrame2 */}
          <div className="wrapper-detect">
            <img
              className="detect-icon1"
              loading="eager"
              alt=""
              src={`${process.env.PUBLIC_URL}/detect@2x.png`}
            />
          </div>
        </div>
        <img
          className="teacher-icon1"
          loading="eager"
          alt=""
          src={`${process.env.PUBLIC_URL}/teacher@2x.png`}
          onClick={onTeacherImageClick}
        />
      </div>
    </div>
  );
};

export default ConsolPage;
