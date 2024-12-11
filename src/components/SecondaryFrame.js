import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams,useLocation } from "react-router-dom";
import "./SecondaryFrame.css";

const SecondaryFrame = () => {
  const location = useLocation();
  const [account,setaccount] = useState('Null'); //用戶名稱
  const [pretest,setpretest] = useState(0); //抓取前測成績
  const [videoSrc, setVideoSrc] = useState("");
  const params = useParams();
  const topic = params.topic;
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      setaccount(location.state.account);
      setpretest(location.state.pretest)
      console.log(location.state.account,location.state.pretest)
    }
  }, [location.state]);


  const onGroupContainerClick = useCallback(() => {
    navigate("/schoolpage" , { state: { account: account ,pretest:pretest} });
  }, [navigate,account,pretest]);

  const onGroupContainer1Click = useCallback(() => {
    navigate(`/Aftertest/` , { state: { account: account, pretest:pretest } });
  }, [navigate,account]);

  const onTeacherImageClick = useCallback(() => {
    navigate("/homepage");
  }, [navigate]);

  useEffect(() => {
    const fetchVideoSrc = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/video/${topic}`);
        // console.log(topic)
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setVideoSrc(data.videoSrc);
      } catch (error) {
        console.error("Error fetching video source:", error);
      }
    };

    fetchVideoSrc();
  }, [topic]);

  return (
    <div className="secondary-frame1">
      <div className="tertiary-frame">
        <div className="quiz-background">
          <div className="back-button-frame">
            <div >
              <iframe 
                src={videoSrc}
                frameBorder="0"
                className="videoframe"
              />
            </div>
            <div className="back-button-frame-child" />
            <div className="page-navigation-group">
              <div className="container" onClick={onGroupContainerClick}>
                <div className="div36">回上頁{}</div>
                <div className="back3" />
              </div>
              <div
                className="parent1"
                onClick={() => onGroupContainer1Click([topic])}>
                <div className="div37">進行後測</div>
                <div className="quiz1" />
              </div>
            </div>
          </div>
        </div>
        <div className="wrapper-stu2">
          <img
            className="stu-icon3"
            loading="eager"
            alt=""
            src="/stu@2x.png"
          />
        </div>
      </div>
      <img
        className="teacher-icon4"
        loading="eager"
        alt={account}
        src="/teacher@2x.png"
        onClick={onTeacherImageClick}
      />
    </div>
  );
};

export default SecondaryFrame;
