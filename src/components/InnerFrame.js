import "./InnerFrame.css";
const handleRestart = () => {
  window.location.reload();
};
const InnerFrame = ({ prop }) => {
  return (
    <header className="inner-frame" >
      <div className="detect-logo2">
        <div className="detect-logo-item" />
        <div className="div30" onClick={handleRestart}>{prop}</div>
      </div>
    </header>
  );
};

export default InnerFrame;
