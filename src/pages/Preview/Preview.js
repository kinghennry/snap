import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import "./preview.css";
import {
  resetCameraImage,
  selectCameraImage,
} from "../../features/cameraSlice";
import NoteIcon from "@mui/icons-material/Note";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import TimerIcon from "@mui/icons-material/Timer";
import CropIcon from "@mui/icons-material/Crop";
import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from "@mui/icons-material/Close";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";
import { db, storage } from "../../firebase";
import firebase from "firebase";
import { selectUser } from "../../features/appSlice";
function Preview() {
  const user = useSelector(selectUser);

  //pull image we got frommwebcam. in  redux state
  const cameraImage = useSelector(selectCameraImage);
  const history = useHistory();
  const dispatch = useDispatch();

  //reset camera image
  const closePreview = () => {
    dispatch(resetCameraImage());
  };
  // piece of code if there is no image

  React.useEffect(() => {
    if (!cameraImage) {
      history.replace("/");
    }
  }, [cameraImage, history]);

  const sendPost = () => {
    const id = uuid();
    const uploadTask = storage
      .ref(`posts/${id}`)
      .putString(cameraImage, "data_url");

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        // error func
        console.log(error);
      },
      () => {
        //complete function:when uploads finishes..this one runs
        storage
          .ref("posts")
          .child(id)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              imageUrl: url,
              username: user.username,
              read: false,
              profilePic: user.profilePic,
              timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            history.replace("/chats");
          });
      }
    );
  };
  return (
    <div className="preview">
      <CloseIcon className="preview__close" onClick={closePreview} />
      <div className="preview__toolbarRight">
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <img src={cameraImage} alt="cameraImage" />
      <div onClick={sendPost} className="preview__footer">
        <h2>Send Now</h2>
        <SendIcon fontSize="small" className="preview__sendIcon" />
      </div>
    </div>
  );
}

export default Preview;
