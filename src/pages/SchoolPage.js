import InnerFrame from "../components/InnerFrame";
import LeftSideFrame from "../components/LeftSideFrame";
import { useLocation } from 'react-router-dom';
import "./SchoolPage.css";

const SchoolPage = () => {
  const location = useLocation();
  const { account ,pretest} = location.state  || {};
  console.log(account,pretest)

  return (
    <div className="schoolpage">
      <img className="bkground-icon1" alt="" 
        src={`${process.env.PUBLIC_URL}/bkground@2x.png`} 
        />
      <InnerFrame prop="數位小學堂" />
      <LeftSideFrame account={account} pretest={pretest} />
    </div>
  );
};

export default SchoolPage;
