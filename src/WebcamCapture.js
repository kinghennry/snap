import React, { useCallback, useRef } from "react";
// import camera module
import Webcam from "react-webcam";
//import radio button
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import "./webcam.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCameraImage } from "./features/cameraSlice";

// object responsible for the size of video
const videoConstraints = {
  width: "250",
  height: "400",
  //   the front facing camera
  facingMode: "user",
};

function WebcamCapture() {
  // this is a pointer pointing at the webcam.
  const webcamRef = useRef(null);
  // import useHistory
  const history = useHistory();
  //  dispatch  image
  const dispatch = useDispatch();
  // usecallbackis a sweet optimization is used when we dont need unnecessary re renders if we dont need it --it uses the previous answer from the resutlt of the func.

  //   capture func
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    dispatch(setCameraImage(imageSrc));
    history.push("/preview");
  }, [webcamRef]);

  return (
    <div className="webcamCapture">
      <Webcam
        audio={false}
        height={videoConstraints.height}
        width={videoConstraints.width}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <RadioButtonUncheckedIcon
        className="webcamCapture__button"
        onClick={capture}
        fontSize="large"
      />
    </div>
  );
}
export default WebcamCapture;
