import React, { useCallback, useEffect, useState } from "react";
import InnerFrame from "../components/InnerFrame";
import { Popover } from 'antd';
import { useNavigate, useParams } from "react-router-dom";
import "./SchoolQuiz.css";

const SchoolQuiz = () => {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const params = useParams();
  const topic = params.topic;
  const ans = quizData && currentQuestionIndex !== null ? quizData[currentQuestionIndex].ans : '我是答案';

  const onGroupContainerClick = useCallback(() => {
    navigate("/schoolpage");
  }, [navigate]);

  const onTeacherImageClick = useCallback(() => {
    navigate("/homepage");
  }, [navigate]);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/quiz/${topic}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setQuizData(data);
        setCurrentQuestionIndex(Math.floor(Math.random() * data.length));
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchQuizData();
  }, [topic]); 

  return (
    <div className="schoolquiz">
      <img className="bkground-icon6" alt="" src="/bkground@2x.png" />
      <InnerFrame prop="仔細想想看" />
      <div className="frame-div">
        <div className="bk-frame-parent">
          <div className="bk-frame">
            <div className="rectangle-parent">
              <div className="frame-child" />
              <div className="frame-wrapper">
                <div className="frame-parent1">
                  <div className="wrapper">
                    <div className="div12">{topic}</div>
                  </div>
                  <div className="div13">
                    {quizData ? quizData[currentQuestionIndex].que.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    )) : '題目'}
                  </div>
                </div>
              </div>
              <div className="frame-parent2">
                <div className="parent" onClick={onGroupContainerClick}>
                  <div className="div14">其他影片</div>
                  <div className="back" />
                </div>
                <div className="group">
                  <Popover className="group" content={ans} overlayStyle={{ fontSize: 30 }} placement="bottom" >
                    <div className="div15">答案</div>
                    <div className="quiz" />
                  </Popover>
                </div>
              </div>
            </div>
          </div>
          <div className="wrapper-stu">
            <img
              className="stu-icon1"
              loading="eager"
              alt=""
              src="/stu@2x.png"
            />
          </div>
        </div>
        <img
          className="teacher-icon3"
          loading="eager"
          alt=""
          src="/teacher@2x.png"
          onClick={onTeacherImageClick}
        />
      </div>
    </div>
  );
};

export default SchoolQuiz;
