import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Avatar from "@mui/material/Avatar";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import "./chats.css";
import { db } from "../../firebase";
import Chat from "./chat/Chat";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/appSlice";
import { resetCameraImage } from "../../features/cameraSlice";
import { auth } from "../../firebase";
import { useHistory } from "react-router-dom";

function Chats() {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(selectUser);
  useEffect(() => {
    db.collection("posts")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);
  const takeSnap = () => {
    dispatch(resetCameraImage());
    history.push("/");
  };
  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar
          src={user.profilePic}
          onClick={() => {
            auth.signOut();
          }}
          className="chats__avatar"
        />
        <div className="chats__search">
          <SearchIcon className="chats__searchIcon" />
          <input type="text" placeholder="Friends" />
        </div>
        <ChatBubbleIcon className="chats__chatIcon" />
      </div>

      <div className="chats__posts">
        {posts.map(
          ({
            id,
            data: { profilePic, username, timeStamp, imageUrl, read },
          }) => (
            <Chat
              key={id}
              id={id}
              username={username}
              timestamp={timeStamp}
              read={read}
              profilePic={profilePic}
              imageUrl={imageUrl}
            />
          )
        )}
      </div>
      <RadioButtonUncheckedIcon
        className="chats__takePicIcon"
        onClick={takeSnap}
        fontSize="large"
      />
    </div>
  );
}
export default Chats;
