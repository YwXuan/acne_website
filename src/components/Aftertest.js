import React, { useCallback, useEffect, useState } from "react";
import InnerFrame from "./InnerFrame";
import { Button,ButtonToolbar  } from 'rsuite';
import { useNavigate, useParams ,useLocation } from "react-router-dom";
import 'rsuite/dist/rsuite.min.css';

const Aftertest = () => {
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); //目前題數
    const [userAnswers, setUserAnswers] = useState(null); // 保存用戶的答案
    const [showResult, setShowResult] = useState(false); // 顯示正確答案
    const location = useLocation();
    const [correctAnswers, setCorrectAnswers] = useState(0); // 保存答對的題數
    const [currentPage, setCurrentPage] = useState("nicknameInput"); // 追蹤當前頁面
    const [account,setaccount] = useState('Null'); //用戶名稱 //要抓到後端抓前面填寫的姓名
    const [quizData, setQuizData] = useState([]);

    const [pretest,setpretest] = useState(0); //抓取前測成績
    const total = 7; //總題目數

    const onStuImageClick = useCallback(() => {
      navigate("/feedback", { state: { account: account, pretest:pretest, posttest:correctAnswers } });
      }, [navigate, account,correctAnswers]);

    // 處理返回首頁的點擊事件
    const onTeacherImageClick = useCallback(() => {
    navigate("/homepage");
    }, [navigate]);

    useEffect(() => {
      if (location.state) {
        setaccount(location.state.account);
        setpretest(location.state.pretest);
        console.log(location.state.account,location.state.pretest)
      }
    }, [location.state]);

    const handleStartQuiz = useCallback(async () => {
      try {
          const response = await fetch(`http://140.133.74.246:31611/api/quiz/after/`);
          if (!response.ok) {
              throw new Error('Failed to fetch quiz data');
          }
          const quizData = await response.json();
          setCurrentPage("quiz");
          setQuizData(quizData); // 從後端取得題目資料並更新 quizData 狀態
          // console.log(quizData)
          
      } catch (error) {
          console.error('Error fetching quiz data:', error);
          // 處理錯誤
      }
  }, []);
  
  
    useEffect(() => {
      const checkAnswers = () => {
        if (quizData && userAnswers !== null && showResult !== null) {
          // 追蹤使用者是否答對當前題目
          const answeredCorrectly = quizData[currentQuestionIndex][userAnswers] === showResult;
          if (answeredCorrectly) {
            setCorrectAnswers(prevCorrectAnswers => prevCorrectAnswers + 1);
          }
        }
      };
      checkAnswers();
    }, [quizData, userAnswers, showResult, currentQuestionIndex]);

    const handleAns = useCallback((selectedOption) => {
      setUserAnswers(selectedOption);
      setShowResult(quizData[currentQuestionIndex].ans);
      // 更新當前頁面為作答題目頁面
      setCurrentPage("correctAnswer");
    }, [quizData, currentQuestionIndex]);

    const handleNextQuestion = () => {
    if (currentQuestionIndex < total - 1) {
        setUserAnswers(null) //將選擇答案隱藏
        setShowResult(false); // 隱藏正確答案
        setCurrentQuestionIndex(prevIndex => prevIndex + 1); // 顯示下一題
        setCurrentPage("quiz"); // 更新頁面為作答题目頁面
    } else {
        setUserAnswers(null)  //將選擇答案隱藏
        setShowResult(true); // 顯示結果
        setCurrentPage("result"); // 更新頁面為顯示結果頁面
        console.log(correctAnswers)
    }
    };

    const renderPage = () => {
    switch (currentPage) {
        case "nicknameInput":
        return (
            // 輸入暱稱頁面的內容
            <div className="frame-wrapper">
                <div className="frame-parent1">
                    <div className="wrapper">
                    <div className="div12"><h2>智慧醫療應用於臉部皮膚偵測平台後測</h2></div>
                    </div>
                    <div className="div13" style={{textAlign:'left',}}>
                    <div className="frame-parent_b" style={{flexDirection:'colum'}}>
                        <p>恭喜您完成影片的觀看，歡迎您來到本平台的後測畫面，測驗結果僅供教材修正參考，並不會外洩任何個人資料，請安心作答。</p>
                    <ButtonToolbar>
                    <Button size="lg" color="cyan" block style={{height:50,fontSize:20,margin:13,color:'black'}} onClick={handleStartQuiz} > 接續作答</Button>
                    </ButtonToolbar>
                    </div>
                     <p style={{ color: '#F0AFAB' }}>題目僅供作答一次，請仔細作答，謝謝。</p>
                    </div>
                </div>
                </div>  
        );
        case "quiz":
        return (
            // 作答題目頁面的內容
            <div className="frame-wrapper">
                <div className="frame-parent1">
                    <div className="wrapper">
                    <div className="div12">
                        <h3>
                        <React.Fragment >
                        {quizData[currentQuestionIndex].que}
                        </React.Fragment>
                    </h3>
                    </div>
                    </div>
                    <div className="div13" style={{textAlign:'left',}}>
                    <div className="frame-parent_b" style={{flexDirection:'colum'}}>
                        <div className="div13" style={{textAlign:'left',}}>
                        <div className="frame-parent_b" style={{flexDirection:'column',color:'#95f293'}}>
                            {/* 顯示題目和選項 */}
                            <ButtonToolbar  value={userAnswers} onChange={(value)=>{setUserAnswers(value);console.log(value)}}>
                            {quizData && ['A', 'B', 'C', 'D'].map((option) => (
                            <Button style={{height:80,fontSize:25,color:'whitesmoke',textAlign:'left'}} appearance="subtle" color="cyan" block 
                            value={option} key={option} onClick={()=>{handleAns(option)}}>
                                {quizData[currentQuestionIndex][option]}</Button>
                            ))}
                            </ButtonToolbar></div> 
                        </div>
                    </div>  
                    </div>
                </div>
                </div>  
        );
        case "correctAnswer":
        return (
            // 題目正解頁面的內容
            <div className="frame-wrapper">
            <div className="frame-parent1">
            <div className="wrapper">
                <div className="div12">
                <h2 style={{}}>
                    <React.Fragment >
                    {quizData[currentQuestionIndex].que}
                    </React.Fragment>
                </h2>
                </div>
            </div>
            <div className="div13" style={{textAlign:'left',}}>
                <div className="frame-parent_b" style={{flexDirection:'colum',color:'#00000'}}>
                {['A', 'B', 'C', 'D'].map((option) => (
                        <p key={option} style={{fontSize:26,color:'whitesmoke'}}>{quizData[currentQuestionIndex][option]}
                        </p>
                    ))}
                </div>  
                <React.Fragment >
                  <div style={{alignContent:'center'}}>
                    <p style={{fontSize:26 ,alignContent:'center' , color: '#F0AFAB'}}>正確答案　：{showResult}</p><p style={{fontSize:26,alignContent:'center', color:'black'}}>您的答案是：{quizData[currentQuestionIndex][userAnswers]}</p>
                    <Button size="lg" color="cyan" block style={{height:50,fontSize:20,margin:13,color:'black'}} onClick={handleNextQuestion}>
                    {currentQuestionIndex < total - 1 ? "下一題" : "顯示結果"}</Button>                
                  </div>
                </React.Fragment>
            </div>
            </div>
        </div>  
        );
        case "result":
        return (
            // 答完題目顯示頁面的內容
            <div className="frame-wrapper">
            <div className="frame-parent1">
            <div className="wrapper">
                <div className="div12">
                <h2>後測作答完成</h2>
                </div>
            </div>
            <div className="div13" style={{textAlign:'left',}}>
                <p>感謝您完成後測！我們希望了解您的學習體驗，以便改進課程內容。請花幾分鐘時間填寫回饋量表。</p>
                <p>您的回饋對我們來說非常重要，謝謝您的寶貴意見！</p>
                <p style={{color: '#F0AFAB'}}>此次前測成績：{pretest}題</p>
                <p style={{color: '#F0AFAB'}}>{account}後測成績：{correctAnswers}題</p>
            </div>
            <Button 
              onClick={onStuImageClick} 
              block color="cyan" 
              size="lg" 
              style={{color: '#000000',height:80,width: 500,alignItems:'center', fontSize: 40, alignSelf:'center'}}>
                回饋量表</Button>
            </div>
        </div>  
        );
        default:
        return null;
    }
    };

  return (
    <div className="schoolquiz">
      <img 
        className="bkground-icon6" 
        alt="" 
        src={`${process.env.PUBLIC_URL}/bkground@2x.png`}
      />
      <InnerFrame prop="仔細想想看" />
      <div className="frame-div">
        <div className="bk-frame-parent">
          <div className="bk-frame">
            <div className="rectangle-parent">
              <div className="frame-child" />
              {renderPage()}
            </div>
          </div>
          <div className="wrapper-stu">
            <img
              className="stu-icon1"
              loading="eager"
              alt=""
              src={`${process.env.PUBLIC_URL}/stu@2x.png`}
              />
          </div>
        </div>
        <img
          className="teacher-icon3"
          loading="eager"
          alt=""
          src={`${process.env.PUBLIC_URL}/teacher@2x.png`}
          onClick={onTeacherImageClick}
        />
      </div>
    </div>
  );
};

export default Aftertest;
