import React, { useState, useEffect } from "react";
import "../styles/Post.css";
import { Avatar, IconButton } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineSharpIcon from "@material-ui/icons/ChatBubbleOutlineSharp";
import ChatBubbleSharpIcon from "@material-ui/icons/ChatBubbleSharp";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import BookmarksOutlinedIcon from "@material-ui/icons/BookmarksOutlined";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { db } from "../firebase";
import firebase from "firebase";

const useStyles = makeStyles({
  commentBox: {
    width: "90%",
    padding: "5px",
  },
  noOutline: {
    "&:focus": {
      outline: "none",
    },
  },
  send: {
    "&:focus": {
      outline: "none",
    },
    transform: "rotate(-30deg)",
  },
});

function Post(props) {
  const classes = useStyles();
  const { username, imageUrl, caption } = props;
  const [showComments, setshowComments] = useState(false);
  const [isFav, setisFav] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const postId = props.postId;
  const { user, setSign } = props;

  useEffect(() => {
    let clean;
    if (postId) {
      clean = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      clean();
    };
  }, [postId]);

  function postComment(e) {
    if (user) {
      db.collection("posts").doc(postId).collection("comments").add({
        text: comment,
        username: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      setComment("");
    } else {
      setSign(true);
    }
  };
  return (
    <div className="post">
      {/* Post Header */}
      <div className="post__header">
        <div className="post__header__inner">
          <Avatar
            src="source"
            style={{ fontFamily: "Mate SC" }}
            alt={username}
          />
          <div className="user__info">
            <span className="username">
              <strong style={{ fontFamily: "Mate SC" }}>{username}</strong>
            </span>
          </div>
        </div>
        <IconButton className={classes.noOutline}>
          <MoreHorizIcon />
        </IconButton>
      </div>

      {/* Post Image  */}
      <img className="img img-fluid post__image" src={imageUrl} alt="" />
      <div className="post__icons">
        <div>
          <IconButton
            onClick={() => {
              setisFav(!isFav);
            }}
            className={classes.noOutline}
          >
            {!isFav ? <FavoriteBorderIcon /> : <FavoriteIcon color="error" />}
          </IconButton>
          <IconButton
            className={classes.noOutline}
            onClick={() => {
              setshowComments(!showComments);
            }}
          >
            {!showComments ? (
              <ChatBubbleOutlineSharpIcon />
            ) : (
              <ChatBubbleSharpIcon />
            )}
          </IconButton>
          <IconButton className={`${classes.send}`}>
            <SendOutlinedIcon />
          </IconButton>
        </div>
        <div>
          <IconButton className={classes.noOutline}>
            <BookmarksOutlinedIcon />
          </IconButton>
        </div>
      </div>
      {/* caption */}
      <div className="post__caption">
        <p>
          <strong style={{ fontFamily: "Mate SC" }}>@{username}</strong>
          <span style={{ marginLeft: 10, fontFamily: "Viaoda Libre" }}>
            {caption}
          </span>
        </p>
      </div>
      {/* Comment Section */}
      {showComments ? (
        <div className="comments-box">
          <p style={{ color: "lightgray" }}>All Comments</p>
          <div>
            {comments.map((comment) => {
              return (
                <p className="comment">
                  <strong style={{ fontFamily: "Viaoda Libre, cursive" }}>
                    {comment.username}
                  </strong>
                  <span
                    style={{
                      marginLeft: 10,
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    {comment.text}
                  </span>
                </p>
              );
            })}
          </div>
        </div>
      ) : null}
      {/* comment textBox */}
      {user && showComments ? (
        <div className="comment-box">
          <TextField
            className={classes.commentBox}
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <IconButton onClick={postComment} className={classes.noOutline}>
            <SendOutlinedIcon color="primary" />
          </IconButton>
        </div>
      ) : null}
    </div>
  );
}

export default Post;
