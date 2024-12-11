import React, { useCallback } from "react";
import { useNavigate ,useLocation } from "react-router-dom";
import "./LeftSideFrame.css";
import { Button } from "rsuite";

const LeftSideFrame = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { account,pretest } = location.state || {};
  console.log(account,pretest)

  const onGroupContainerClick = useCallback((id) => {
    navigate(`/schoolvideo/${id}`,{state:{account : account ,pretest:pretest}});  
  }, [navigate,account,pretest]);  

  const onOptionClick = useCallback((value) => {
    navigate(value);
  }, [navigate]);
  const radioGroupData = [
    { id: "神經網路", label: "神經網路", value: "/schoolvideo" },
    { id: "卷積神經", label: "卷積神經網路", value: "/schoolvideo" },
    { id: "影像處理", label: "影像處理", value: "/schoolvideo" },
    { id: "YOLO", label: "YOLO", value: "/schoolvideo" },
    { id: "青春痘", label: "青春痘", value: "/schoolvideo" },
  ];

  return (
    <div className="left-side-frame">
      <div className="student-frame1">
        <div className="background-frame3">
          <div className="rectangle-shape1" style={{padding:30}}>
          {radioGroupData.map((item) => (
            <Button
              className="group-div1" value={item.value}
              style={{color:'black',fontSize:30}}
              onClick={() => onGroupContainerClick(item.id)} 
            >{item.label}</Button>
            ))}

          </div>
        </div>
        <div className="wrapper-stu1">
          <img
            className="stu-icon2"
            loading="eager"
            alt=""
            src={`${process.env.PUBLIC_URL}/stu@2x.png`}
          />
        </div>
      </div>
      <img
        className="teacher-icon4"
        loading="eager"
        alt=""
        src={`${process.env.PUBLIC_URL}/teacher@2x.png`}
        onClick={() => onOptionClick("/homepage")} 
      />
    </div>
  );
};

export default LeftSideFrame;
