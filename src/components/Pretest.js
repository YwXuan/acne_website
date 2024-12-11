import React, { useCallback, useEffect, useState } from "react";
import InnerFrame from "./InnerFrame";
import { Button, Input, InputGroup , Radio, RadioGroup ,ButtonToolbar  } from 'rsuite';
import CheckOutlineIcon from '@rsuite/icons/CheckOutline';
import { useNavigate, useParams } from "react-router-dom";
import 'rsuite/dist/rsuite.min.css';
import "./Pretest.css";

const Pretest = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); //目前題數
  const [userAnswers, setUserAnswers] = useState(null); // 保存用戶的答案
  const [showResult, setShowResult] = useState(false); // 顯示正確答案
  const [currentPage, setCurrentPage] = useState("nicknameInput"); // 追蹤當前頁面
  const [account,setaccount] = useState(''); //用戶名稱
  const [quizData, setQuizData] = useState([]);
  const total = 7; //總題目數
  const [pretest,setpretest] = useState(0); //抓取前測成績

  

  const onStuImageClick = useCallback(() => {
    navigate("/schoolpage", { state: { account: account, pretest:pretest } });
    }, [navigate, account,pretest]);

  
  // 處理返回首頁的點擊事件
  const onTeacherImageClick = useCallback(() => {
    navigate("/homepage");
  }, [navigate]);

  const handleStartQuiz = useCallback(async () => {
    try {
        const response = await fetch(`http://localhost:3001/api/quiz/before/`);
        if (!response.ok) {
            throw new Error('Failed to fetch quiz data');
        }
        const quizData = await response.json();
        setCurrentPage("quiz");
        setQuizData(quizData); // 将从后端获取的数据设置为 quizData 状态
        console.log(quizData)
        
    } catch (error) {
        console.error('Error fetching quiz data:', error);
        // 处理错误情况
    }
}, []);


  useEffect(() => {
    const checkAnswers = () => {
      if (quizData && userAnswers !== null && showResult !== null) {
        // 追蹤使用者是否答對當前題目
        const answeredCorrectly = quizData[currentQuestionIndex][userAnswers] === showResult;
        if (answeredCorrectly) {
          setpretest(prevCorrectAnswers => prevCorrectAnswers + 1);
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
      console.log("目前答對題數：",pretest)
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
                    <div className="div12"><h1>不再為你痘留前測</h1></div>
                  </div>
                  <div className="div13" style={{textAlign:'left',}}>
                    <div className="frame-parent_b" style={{flexDirection:'colum'}}>
                      <p>歡迎您來到本平台的前測畫面，我們將蒐集您的姓名及測驗，僅供教材修正參考，並不會外洩任何個人資料，請安心作答。</p>
                    <InputGroup  style={{marginTop:50,marginLeft:70,textAlign:'center',width: 500,marginBottom: 10}} size="lg" >
                      <Input type="text" name="text" style={{fontSize:35,height:70}} placeholder="請輸入您的姓名" onChange={(e)=>{setaccount(e)}}/>
                      <InputGroup.Button style={{fontSize:35,height:70,backgroundColor:'#46677e',color:'white'}} onClick={()=>{handleStartQuiz()}}>
                        <CheckOutlineIcon />
                      </InputGroup.Button>
                    </InputGroup>
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
                      <h2>
                      <React.Fragment >
                        {quizData[currentQuestionIndex].que}
                      </React.Fragment>
                    </h2>
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
                <h2>
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
                <h2>作答完成</h2>
              </div>
            </div>
            <div className="div13" style={{textAlign:'left',}}>
              <div className="frame-parent_b" style={{flexDirection:'colum',}}></div>  
              <p>接下來請仔細觀看我們準備的影片，在影片中可以學習到關於本平台的相關知識，看完後請進行後測，透過成績的體現，讓您對於自己的觀看更加瞭解。</p>
              <h2>恭喜{account}總共答對了：{pretest}題</h2>
            </div>
            <Button onClick={onStuImageClick} block color="cyan" size="lg" style={{color: '#000000',height:80,width: 500,alignItems:'center', fontSize: 40, alignSelf:'center'}}>觀看影片</Button>
          </div>
        </div>  
        );
      default:
        return null;
    }
  };

  return (
    <div className="schoolquiz">
      <img className="bkground-icon6" alt="" 
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

export default Pretest;
