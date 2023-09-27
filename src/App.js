import "./App.css";
import background from "./assets/background.svg";
import Webcam from "react-webcam";
import { useRef, useState, useCallback } from "react";

import { motion } from "framer-motion";

import { uploadUrl, uploadImage } from "./firebase/index";

import { getChatGPTResponse } from "./services/chatgpt";

import ImagePreview from "./components/ImagePreview";
import ContactPreview from "./components/ContactPreview";
import UploadingScreen from "./components/UploadingScreen";

import options from "./config/options";

const App = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [contactData, setContactData] = useState({});
  const [screen, setScreen] = useState("scan");
  const [status, setStatus] = useState("");
  const [mirrored, setMirrored] = useState(false);

  const capture = useCallback(() => {
    setScreen("preview");
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const onRetake = () => {
    setScreen("scan");
    setImgSrc(null);
    setContactData({});
  };

  const parseCardText = async (text) => {
    const response = await getChatGPTResponse(
      `${options.CHATGPT_PROMPT_TEXT}...${text}`
    );
    return response;
  };

  const onUploadImage = async () => {
    setScreen("uploading");
    const url = await uploadImage(imgSrc);
    scanImage(url);
  };

  const scanImage = async (url) => {
    uploadUrl(
      url,
      async (text) => {
        const response = await parseCardText(text);
        setContactData(JSON.parse(response) || {});
        setScreen("contact");
      },
      (error) => {
        setStatus(error);
      }
    );
  };

  return (
    <div
      className="app-container"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="container">
        <div className="btn-container">
          {screen === "preview" && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={
                screen === "preview"
                  ? { scale: 1, opacity: 1 }
                  : { scale: 0.8, opacity: 0 }
              }
              transition={{ duration: 1 }}
            >
              <ImagePreview image={imgSrc} />
              <div className="controls">
                <button onClick={onRetake} className="btn">
                  Retake photo
                </button>
                <button onClick={onUploadImage} className="btn">
                  Upload
                </button>
              </div>
            </motion.div>
          )}
          {screen === "scan" && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={
                screen === "scan"
                  ? { scale: 1, opacity: 1 }
                  : { scale: 0.8, opacity: 0 }
              }
              transition={{ duration: 1 }}
            >
              <Webcam
                height={600}
                width={600}
                ref={webcamRef}
                mirrored={mirrored}
                screenshotFormat="image/jpeg"
                screenshotQuality={0.8}
              />
              <div className="controls">
                <button onClick={capture} className="btn">
                  Capture photo
                </button>
                <input
                  type="checkbox"
                  checked={mirrored}
                  onChange={(e) => setMirrored(e.target.checked)}
                />
                <label>Mirror</label>
              </div>
            </motion.div>
          )}
          {screen === "uploading" && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={
                screen === "uploading"
                  ? { scale: 1, opacity: 1 }
                  : { scale: 0.8, opacity: 0 }
              }
              transition={{ duration: 1 }}
            >
              <UploadingScreen />
            </motion.div>
          )}
          {screen === "contact" && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={
                screen === "contact"
                  ? { scale: 1, opacity: 1 }
                  : { scale: 0.8, opacity: 0 }
              }
              transition={{ duration: 1 }}
            >
              <ContactPreview
                contactData={contactData}
                onStartAgain={onRetake}
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
