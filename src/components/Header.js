import "../styles/Header.css";
import { Button } from "@material-ui/core";
import React from "react";
import { auth } from "../firebase";

function Header({ setOpen, user, setSign, upload, setUpload }) {
  return (
    <div className="header">
      <img
        className="header__logo"
        src="https://www.virtualstacks.com/wp-content/uploads/2019/11/instagram-logo-name.png"
        alt="Instagram"
      />
      <div>
        {user &&
          (!upload ? (
            <Button
              className="header__btn"
              type="button"
              variant="outlined"
              onClick={() => {
                setUpload(true);
              }}
            >
              Add Post
            </Button>
          ) : (
            <Button
              className="header__btn"
              type="button"
              variant="contained"
              color="secondary"
              onClick={() => {
                setUpload(false);
              }}
            >
              Close
            </Button>
          ))}
      </div>
      <div>
        {user ? (
          <Button
            className="header__btn"
            type="button"
            variant="outlined"
            onClick={() => auth.signOut()}
          >
            LogOut
          </Button>
        ) : (
          <div>
            <Button
              className="header__btn"
              type="button"
              variant="outlined"
              onClick={() => setSign(true)}
              style={{ marginRight: "10px" }}
            >
              Sign In
            </Button>
            <Button
              className="header__btn"
              type="button"
              variant="outlined"
              onClick={() => setOpen(true)}
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
