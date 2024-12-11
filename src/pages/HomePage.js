import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {  Popover } from 'antd';
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const onStuImageClick = useCallback(() => {
    navigate("/pretest");
  }, [navigate]);
const onGameImageClick = useCallback(() => {
  navigate("/gamepage");
}, [navigate]);
  const onDetectImageClick = useCallback(() => {
    navigate("/detectpage");
  }, [navigate]);

  return (
    <div className="homepage">
      <img className="bkground-icon" alt="" src="/bk_homepage@2x.png" />
      <div className="sub-frame-a">
        <div className="frame-parent">
          <div className="stu-wrapper">
          <Popover content='歡迎進入小學堂' overlayStyle={{fontSize:30}} placement="right" >
            <img
              className="stu-icon"
              loading="eager"
              alt=""
              src="/stu@2x.png"
              onClick={onStuImageClick}
            />
          </Popover>

          </div>
          <img
            className="detect-icon"
            loading="eager"
            alt=""
            src="/detect@2x.png"
            onClick={onDetectImageClick}
          />
        </div>
      </div>
      <div className="game-parent">
      <Popover content='進入小遊戲' overlayStyle={{fontSize:30}} placement="left" >

        <img 
          className="game-icon"
          alt="" 
          src="/game@2x.png" 
          onClick={onGameImageClick}
        />
        </Popover>
        <img
          className="teacher-icon"
          loading="eager"
          alt=""
          src="/teacher@2x.png"
        />
      </div>
    </div>
  );
};

export default HomePage;
