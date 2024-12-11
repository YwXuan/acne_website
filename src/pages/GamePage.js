import { useCallback } from "react";
import DetectLogo from "../components/DetectLogo";
import {  Popover } from 'antd';
import BorderFrame from "../components/BorderFrame";
import { useNavigate } from "react-router-dom";
import InnerFrame from "../components/InnerFrame";
import "./GamePage.css";

const GamePage = () => {
  const navigate = useNavigate();

  const onTeacherImageClick = useCallback(() => {
    navigate("/homepage");
  }, [navigate]);

  return (
    <div className="gamepage">
      <img className="bkground-icon4" alt="" src="/bkground@2x.png" />
      <InnerFrame prop="知識小遊戲" />
      <div className="frame-container">
        <div className="border-frame-parent">
          <BorderFrame />
          
            <div className="wrapper-game" >
                <img
                className="game-icon1"
                loading="eager"
                alt=""
                src="/game@2x.png"
              />         
            </div>
        </div>
        <img
          className="teacher-icon2"
          loading="eager"
          alt=""
          src="/teacher@2x.png"
          onClick={onTeacherImageClick}
        />
      </div>
    </div>
  );
};

export default GamePage;

