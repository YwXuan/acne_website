import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SubFrame.css";
import BkFrame2 from "./BkFrame2.js";

const SubFrame = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);

  const onGroupContainerClick = useCallback((id) => {
    // 在点击事件处理程序中设置selectedId，并立即打印
    setSelectedId(id);
    console.log("Clicked item id:", id);
    console.log("Selected Id after click:", id);

    // 导航到 "/consolpage"
    navigate(`/consolpage/${id}`);
  }, [navigate]);

  const onTeacherImageClick = useCallback(() => {
    // 导航到 "/homepage"
    navigate("/homepage");
  }, [navigate]);

  
  // 样本数据用于单选按钮组
  const radioGroupData = [
    { id: "1", label: "l1", value: "/consolpage" },
    { id: "2", label: "l2", value: "/consolpage" },
    { id: "3", label: "l3", value: "/consolpage" },
    { id: "4", label: "l4", value: "/consolpage" },
    { id: "5", label: "l5", value: "/consolpage" },
    { id: "6", label: "l6", value: "/consolpage" },
  ];

  return (
    <div className="sub-frame">
      <div className="inner-frame1">
        <div className="border-frame">    
          <div className="background-container"></div>
          {radioGroupData.map((item) => (
            <div key={item.id} className="radio-item">
              <input
                type="radio"
                id={item.id}
                className="radio"
                name="groupSelection"
                value={item.value}
                onClick={() => onGroupContainerClick(item.id)}
              />
              <label htmlFor={item.id}>
                <img
                  src={`/detectpic/${item.id}.jpg`} // 替換圖片的URL
                  alt={item.label}
                  className="group-div"
                />
              </label>            
            </div>
          ))}
        </div>
        <div className="wrapper-detect1">
          <img
            className="detect-icon2"
            loading="eager"
            alt=""
            src="/detect@2x.png"
          />
        </div>
      </div>
      <div className="teacher-icon5" onClick={onTeacherImageClick}>
        <img
          className="teacher-icon5"
          loading="eager"
          alt=""
          src="/teacher@2x.png"
          onClick={onTeacherImageClick}
        />
      </div>
        {selectedId && <BkFrame2 selectedId={selectedId} />}
    </div>
  );
};

export default SubFrame;
