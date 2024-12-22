import React, { useCallback, useEffect, useState } from "react";
import InnerFrame from "../components/InnerFrame";
import { Form, Input, Button, Rate, Select, Radio, Row, Col, message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import "./feedback.css";

const Feedback = () => {
  const navigate = useNavigate();
  const [posttest, setposttest] = useState(0);  //取得後測題數
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [pretest,setpretest] = useState(0); //抓取前測成績
  const [account,setaccount] = useState('Null'); //用戶名稱 
  const location = useLocation();
  
  useEffect(() => {
    if (location.state) {
      setaccount(location.state.account);
      setpretest(location.state.pretest);
      setposttest(location.state.posttest);
      console.log(location.state.account,location.state.pretest,location.state.posttest);
    }
  }, [location.state]);

  // 監聽狀態變化並打印出來
  useEffect(() => {
    console.log(account, pretest, posttest);
  }, [account, pretest, posttest]);

  const [formValues, setFormValues] = useState({
    name: '',
    preTestScore: 0,
    postTestScore: 0,
    courseEvaluation: [null, null, null],
    selfEvaluation: [null, null, null],
    learningTransfer: [null, null],
    gender: '', // 性別（male/female/other）
    hasSkinCondition: null, // 是否有皮膚疾病（true/false）
    severitySkinCondition: null, // 皮膚疾病嚴重程度（1-10 或 null）
    treatmentQuestion10: null, // 是否有就醫治療（true/false）
  });
  const [form] = Form.useForm(); // 初始化 form 實例
  const [allFormValues, setAllFormValues] = useState({}); // 用於保存所有頁面的數據

  useEffect(() => {
    console.log("Form values updated:", formValues);
  }, [formValues]);  // Log when formValues are updated


  useEffect(() => {
    setFormValues({
      name: account,
      preTestScore: pretest,
      postTestScore: posttest,
    });
  }, [account, pretest, posttest]);  // 當 account、pretest 或 posttest 改變時觸發


  useEffect(() => {
    if (form) {
      // 只有當 formValues 更新才回填數據
      form.setFieldsValue(formValues);
    }
  }, [formValues, form]);  // 監聽 formValues 和 form 的變化

  useEffect(() => {
    if (form && formValues) {
      form.setFieldsValue(formValues);  // Ensure form is updated with the latest state
    }
  }, [form, formValues]);  // Re-run when formValues change
  const sendFeedbackToBackend = async (feedbackData) => {
    try {
      const response = await fetch('http://140.133.74.246:31611/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        console.log('表單資料已成功提交到後端！');
        message.success("感謝您的回饋！數據已提交成功。");
        onTeacherImageClick();
      } else {
        console.error('提交失敗:', response.statusText);
        message.error("提交失敗，請稍後重試。");
      }
    } catch (error) {
      console.error('提交過程中出現錯誤:', error);
      message.error("提交過程中出現錯誤。");
    }
  };
  

  const nextSection = async () => {
    try {
      const currentSectionValues = await form.validateFields();
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        ...currentSectionValues,
      }));
      setAllFormValues((prevAllFormValues) => ({
        ...prevAllFormValues,
        ...currentSectionValues,
      }));

      if (currentQuestionIndex < 4) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimeout(() => {
          form.setFieldsValue(allFormValues);
        }, 0);
      }

      if (currentQuestionIndex === 4) {
        console.log("Final form values:", formValues);
        // await sendFeedbackToBackend(formValues);
      }
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };
  
  const prevSection = async () => {
    try {
      // Save the current section's values before moving back
      const currentValues = await form.validateFields();
      setAllFormValues((prev) => ({
        ...prev,
        ...currentValues,
      }));
  
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      }
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const onTeacherImageClick = useCallback(() => {
    navigate("/homepage");
  }, [navigate]);

  

  return (
    <div className="feedback">
      <img className="bkground-icon6" alt="" src={`${process.env.PUBLIC_URL}/bkground@2x.png`} />
      <InnerFrame prop="回饋表單" />

      <div className="frame-div">
        <div className="bk-frame-parent">
          <div className="bk-frame">
            <div className="rectangle-parent">
              <div className="frame-child" />
              <div className="frame-wrapper">
                <div className="frame-parent1">
                  <div className="div13">
                    {/* Form Container */}
                    <div className="form-container">
                      <Form
                        form={form}
                        // onFinish={nextSection}
                        layout="vertical"
                        style={{ width: '100%',height: '80%', margin: '0 0 20 0' }}
                        onFinish={async (values) => {
                          console.log("Final submitted values:", values);
                          await sendFeedbackToBackend(formValues);
                        }}
                        initialValues={formValues}
                      >
                        {/* Step 0: 介紹頁 */}
                      {currentQuestionIndex === 0 && (
                        <div>
                          <div className="title">歡迎填寫平台使用回饋表單</div>
                          <div className="content">
                            <p>
                              本表單將協助我們了解您在課程中的學習經驗和滿意度，提供您的寶貴意見可幫助我們改善課程內容。
                              我們承諾，您的回饋將保持匿名，並且僅用於課程改進的目的。請放心填寫，您的意見對我們非常重要。
                            </p>
                          </div>
                          
                        </div>
                      )}
                        {/* Step 2: 課程評價 */}
                        {currentQuestionIndex === 1 && (
                          <div>
                            <div className="title">課程評價</div>
                            <Form.Item label={<span style={{ fontSize: '30px', color:"#FFFFFF" }}>我喜歡運用平台體驗學習的方式學習人工智慧</span>} name={["courseEvaluation", 0]} rules={[{ required: true, message: "請給出評價!" }]}>
                              <Rate character={<span style={{ fontSize: '40px',margin: '0 5px' }}>★</span>} />
                            </Form.Item>
                            <Form.Item label={<span style={{ fontSize: '30px', color:"#FFFFFF" }}>我在平台中學到很多人工智慧的知識</span>} name={["courseEvaluation",1]} rules={[{ required: true, message: "請給出評價!" }]}>
                              <Rate character={<span style={{ fontSize: '40px',margin: '0 5px' }}>★</span>} />
                            </Form.Item>
                            <Form.Item label={<span style={{ fontSize: '30px', color:"#FFFFFF" }}>我覺得平台內容很有趣</span>} name={["courseEvaluation",2]} rules={[{ required: true, message: "請給出評價!" }]}>
                              <Rate character={<span style={{ fontSize: '40px',margin: '0 5px' }}>★</span>} />
                            </Form.Item>
                          </div>
                        )}

                        {/* Step 3: 自我評價 */}
                        {currentQuestionIndex === 2 && (
                          <div>
                            <div className="title">自我評價</div>
                            <Form.Item 
                              label={<span style={{ fontSize: '30px', color:"#FFFFFF" }}>我很沉浸在平台的體驗內容</span>} 
                              name={["selfEvaluation",0]} 
                              rules={[{ required: true, message: "請給出評價!" }]}>
                              <Rate character={<span style={{ fontSize: '40px',margin: '0 5px' }}>★</span>} />
                            </Form.Item>
                            <Form.Item label={<span style={{ fontSize: '30px', color:"#FFFFFF" }}>透過平台我更了解人工智慧的應用</span>} name={["selfEvaluation",1]} rules={[{ required: true, message: "請給出評價!" }]}>
                              <Rate character={<span style={{ fontSize: '40px',margin: '0 5px' }}>★</span>} />
                            </Form.Item>
                            <Form.Item label={<span style={{ fontSize: '30px', color:"#FFFFFF" }}>我覺得實際體驗平台後引發我對人工智慧的興趣</span>} name={["selfEvaluation",2]} rules={[{ required: true, message: "請給出評價!" }]}>
                              <Rate character={<span style={{ fontSize: '40px',margin: '0 5px' }}>★</span>} />
                            </Form.Item>
                          </div>
                        )}

                        {/* Step 4: 學習遷移 */}
                        {currentQuestionIndex === 3 && (
                          <div>
                            <div className="title">學習遷移</div>
                            <Form.Item label={<span style={{ fontSize: '30px', color:"#FFFFFF" }}>實際體驗後我想到更多可以結合人工智慧的應用</span>}  style={{ color: 'white' }} name={["learningTransfer",0]} rules={[{ required: true, message: "請給出評價!" }]}>
                              <Rate character={<span style={{ fontSize: '40px',margin: '0 5px' }}>★</span>} />
                            </Form.Item>
                            <Form.Item label={<span style={{ fontSize: '30px', color:"#FFFFFF" }}>實際體驗後我會試著實際應用在別的領域</span>} name={["learningTransfer",1]} rules={[{ required: true, message: "請給出評價!" }]}>
                              <Rate character={<span style={{ fontSize: '40px',margin: '0 5px' }}>★</span>} />
                            </Form.Item>
                          </div>
                        )}
                        {/* Step 5: 個人調查 */}
                        {currentQuestionIndex === 4 && (
                          <div>
                            {/* <div className="title">個人資料</div> */}
                              {/* 性別選擇 */}
                              <Form.Item
                                label={<span style={{ fontSize: '25px', color: "#FFFFFF" }}>性別</span>}
                                name="gender"
                                rules={[{ required: true, message: "請選擇性別!" }]}
                              >
                                <Select style={{ width: '500px' }}>
                                  <Select.Option value="male">生理男</Select.Option>
                                  <Select.Option value="female">生理女</Select.Option>
                                  <Select.Option value="other">其他</Select.Option>
                                </Select>
                              </Form.Item>

                              {/* 是否有皮膚疾病 */}
                              <Form.Item
                                label={<span style={{ fontSize: '25px', color: "#FFFFFF" }}>您是否有青春痘問題</span>}
                                name="hasSkinCondition"
                                rules={[{ required: true, message: "請選擇是否有青春痘問題!" }]}
                              >
                                <Radio.Group>
                                  <Radio value={true} style={{ color: "#FFFFFF", fontSize: '20px' }}>是</Radio>
                                  <Radio value={false} style={{ color: "#FFFFFF", fontSize: '20px' }}>否</Radio>
                                </Radio.Group>
                              </Form.Item>

                              {/* 嚴重程度選項 */}
                              <Form.Item
                                shouldUpdate={(prevValues, currentValues) => prevValues.hasSkinCondition !== currentValues.hasSkinCondition}
                              >
                                {({ getFieldValue }) =>
                                  getFieldValue("hasSkinCondition") === true && (
                                    <Form.Item
                                      label={<span style={{ fontSize: '30px', color: "#FFFFFF" }}>如果有，請評估嚴重程度</span>}
                                      name="severitySkinCondition"
                                      rules={[{ required: true, message: "請給出評價!" }]}
                                    >
                                      <Rate
                                        character={<span style={{ fontSize: '40px', margin: '0 5px' }}>★</span>}
                                        count={10} // 使用 10 級評價
                                      />
                                    </Form.Item>
                                  )
                                }
                              </Form.Item>

                              {/* 是否就醫治療 */}
                              <Form.Item
                                label={<span style={{ fontSize: '25px', color: "#FFFFFF" }}>您是否有就醫治療</span>}
                                name="treatmentQuestion10"
                                rules={[{ required: true, message: "請選擇是否就醫!" }]}
                              >
                                <Radio.Group>
                                  <Radio value={true} style={{ color: "#FFFFFF", fontSize: '20px' }}>有</Radio>
                                  <Radio value={false} style={{ color: "#FFFFFF", fontSize: '20px' }}>無</Radio>
                                </Radio.Group>
                              </Form.Item>
                          </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="button-group">
                        {currentQuestionIndex === -1 ? (
                          <Button className="button" type="primary" onClick={nextSection}>
                            開始填寫
                          </Button>
                        ) : (
                          <>
                            {/* 顯示「上一頁」按鈕，僅在非介紹頁 */}
                            {currentQuestionIndex > 0 && <Button className='button' onClick={prevSection}>上一頁</Button>}
                            
                            {/* 顯示「下一頁」按鈕，僅在非最後一頁 */}
                            {currentQuestionIndex < 4 && (
                              <Button className='button' type="primary" onClick={nextSection}>
                                下一頁
                              </Button>
                            )}
                            
                            {/* 提交按鈕，只在最後一頁顯示 */}
                            {currentQuestionIndex === 4 && (
                              <Button className='button' type="primary" onClick={nextSection} htmlType="submit">
                                提交回饋
                              </Button>
                            )}
                          </>
                        )}
                        </div>
                      </Form>
                    </div>
        
                  </div>
                </div>
              </div>
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


        {/* Teacher Icon */}
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

export default Feedback;
