import React from "react";
import "./styles/App.css";
import Header from "./components/Header";
import Post from "./components/Post";
import { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import PopUp from "./components/PopUp";
import SignInPopUp from "./components/SignInPopUp";
import UploadPost from "./components/UploadPost";
import { Container, Grid } from "@material-ui/core";

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [sign, setSign] = useState(false);
  const [upload, setUpload] = useState(false);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //if user is logged in
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      //cleanup
      unsubscribe();
    };
  }, [user, username]);

  return (
    <div className="App">
      <Header
        upload={upload}
        setUpload={setUpload}
        user={user}
        setSign={setSign}
        setOpen={setOpen}
      />
      <PopUp
        open={open}
        setOpen={setOpen}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        email={email}
        setEmail={setEmail}
        setSign={setSign}
      ></PopUp>
      <SignInPopUp
        sign={sign}
        setSign={setSign}
        password={password}
        setPassword={setPassword}
        email={email}
        setOpen={setOpen}
        setEmail={setEmail}
      ></SignInPopUp>

      <Container>
        <Grid container>
          <Grid item xs={12}>
            <div className="post__box">
              {posts.map(({ id, post }) => {
                return (
                  <Post
                    key={id}
                    postId={id}
                    username={post.username}
                    caption={post.caption}
                    imageUrl={post.imageUrl}
                    user={user}
                    setSign={setSign}
                  />
                );
              })}
            </div>
          </Grid>
        </Grid>
      </Container>

      <div className="upload__box">
        {upload ? (
          user?.displayName ? (
            <UploadPost setUpload={setUpload} username={user.displayName} />
          ) : (
            <h2>Login to Continue...</h2>
          )
        ) : null}
      </div>
    </div>
  );
}

export default App;
