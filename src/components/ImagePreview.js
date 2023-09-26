import React from "react";

const ImagePreview = ({ image }) => {
  return (
    <div className="preview-container">
      <img className="preview-img" src={image} alt="webcam" />
    </div>
  );
};

export default ImagePreview;
