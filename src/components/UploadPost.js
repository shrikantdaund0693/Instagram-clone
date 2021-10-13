import React, { useState } from "react";
import "../styles/UploadPost.css";
import { Button } from "@material-ui/core";
import { storage, db } from "../firebase";
import firebase from "firebase";

function UploadPost({ username, setUpload }) {
  const [progress, setPogress] = useState(0);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    } else {
    }
  };
  function handleUpload(e) {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPogress(progress);
      },
      (err) => {
        console.log(err.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
          });

        setPogress(0);
        setImage(null);
        setCaption("");
        setUpload(false);
      }
    );
  }
  return (
    <div className="post__upload">
      <progress value={progress} max={100} />
      <input
        className="inp"
        type="text"
        name="caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Add a caption..."
      />
      <input className="inp" type="file" name="file" onChange={handleChange} />

      <Button
        style={{ padding: "5px 50px" }}
        variant="contained"
        color="primary"
        disableElevation
        onClick={handleUpload}
      >
        Upload Post
      </Button>
    </div>
  );
}

export default UploadPost;
