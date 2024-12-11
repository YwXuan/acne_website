import InnerFrame from "../components/InnerFrame";
import SecondaryFrame from "../components/SecondaryFrame";
import { useParams,useLocation } from "react-router-dom";
import "./SchoolVideo.css";

const SchoolVideo = () => {
  const location = useLocation();
  const { account,pretest } = location.state  || {};
  console.log(account,pretest)
  const topic = useParams();

  return (
    <div className="schoolvideo">
      <img className="bkground-icon5"  
        src={`${process.env.PUBLIC_URL}/bkground@2x.png`} 
        />
      <InnerFrame prop={topic.topic} />
      <SecondaryFrame  account={account} pretest={pretest} />
    </div>
  );
};

export default SchoolVideo;
