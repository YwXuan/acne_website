import { useMemo } from "react";
import "./DetectLogo.css";

const DetectLogo = ({ prop, propWidth, propPadding, propAlignSelf }) => {
  const detectLogoStyle = useMemo(() => {
    return {
      width: propWidth,
      padding: propPadding,
      alignSelf: propAlignSelf,
    };
  }, [propWidth, propPadding, propAlignSelf]);

  return (
    <div className="detect-logo" style={detectLogoStyle}>
      <button className="detect-logo1">
        <div className="detect-logo-child" />
        <div className="div20">{prop}</div>
      </button>
    </div>
  );
};

export default DetectLogo;
