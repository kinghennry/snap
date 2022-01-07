import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import Login from "./pages/Login/Login";
import Preview from "./pages/Preview/Preview";
import Chats from "./pages/Chats/Chats";
import ChatView from "./pages/Chats/ChatView";
import WebcamCapture from "./WebcamCapture";
import { auth } from "./firebase";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, selectUser } from "./features/appSlice";
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <img
              src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg"
              alt="snapchat"
              className="app__logo"
            />
            <div className="app__body">
              <div className="app__bodyBackground">
                <Switch>
                  <Route exact path="/" component={WebcamCapture} />
                  <Route exact path="/preview" component={Preview} />
                  <Route exact path="/chats" component={Chats} />
                  <Route path="/view" component={ChatView} />
                </Switch>
              </div>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
