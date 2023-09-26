import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

import { motion } from "framer-motion";

const UploadingScreen = () => {
  const handleScaleIn = () => {};
  return (
    <div className="container">
      <motion.div
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeatType: "reverse",
          repeatDelay: 1,
        }}
        onAnimationComplete={handleScaleIn}
      >
        <FontAwesomeIcon icon={faUpload} size="4x" />
      </motion.div>
    </div>
  );
};

export default UploadingScreen;
