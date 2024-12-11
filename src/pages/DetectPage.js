import InnerFrame from "../components/InnerFrame";
import SubFrame from "../components/SubFrame";
import "./DetectPage.css";

const DetectPage = () => {
  return (
    <div className="detectpage">
      <img className="bkground-icon2" alt="" src="/bkground@2x.png" />
      <InnerFrame prop="皮膚辨識" />
      <SubFrame />
    </div>
  );
};

export default DetectPage;
