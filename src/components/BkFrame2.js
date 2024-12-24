import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Popover} from 'antd'
import "./BkFrame2.css";

const BkFrame2 = ({ selectedId }) => {
  const navigate = useNavigate();
  const [textData, setTextData] = useState("");

  const fetchTextData = async () => {
    try {
      const response = await fetch(`http://140.133.74.246:31611/api/textData/${selectedId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTextData(data.text);
    } catch (error) {
      console.error("Error fetching text data:", error);
    }
  };

  useEffect(() => {
    if (selectedId) {
      fetchTextData();
    }
  }, [selectedId]);
  console.log(selectedId)
  const [open, setOpen] = useState(false);
  const handleOpenChange = (newOpen= Boolean) => {
    setOpen(newOpen);
  };
  const onButtonContainerClick = () => {
    navigate("/detectpage");
  };
  return (
    <div className="bk-frame1">
      <div className="border-frame1">
        <div className="border-frame-child" />
        <div className="rectangle-parent1">
          <div className="frame-child1" />
          {/* 使用 selectedId 來動態生成圖片路徑 */}
          <Popover open={open} trigger="click" onOpenChange={handleOpenChange} content={textData} overlayStyle={{fontSize:30,maxWidth:750}} placement="top" >
          <img className="div32" 
            src={`${process.env.PUBLIC_URL}/detectpic/${selectedId}.png`} 
            alt="圖片" />
          </Popover>
        </div>
        <div className="div33" style={{fontSize:"30px"}}><p>當圖片放入已經訓練好的模型後，模型會將有症狀的位置框選出來，並標示症狀名稱</p></div>
        <div className="button-wrapper">
          <div className="button"  onClick={onButtonContainerClick}>重新選擇</div>
        </div>
      </div>
   </div>
  );
};

export default BkFrame2;