import React from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core";
import "../styles/PopUp.css";
import { Input, Button } from "@material-ui/core";
import { auth } from "../firebase";
import { Typography } from "@material-ui/core";

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  padding: {
    padding: "10px",
    textAlign: "center",
  },
}));

function SignInPopUp({
  sign,
  setSign,
  password,
  setPassword,
  email,
  setEmail,
  setOpen,
}) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  function handleSubmit(e) {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch((err) => {
      alert(err.message);
      setSign(true);
    });

    setSign(false);
  }

  const body = (
    <div style={modalStyle} className={`popUp ${classes.paper}`}>
      <div className="header">
        <img
          className="header__logo"
          src="https://www.virtualstacks.com/wp-content/uploads/2019/11/instagram-logo-name.png"
          alt="Instagram"
        />
        <Button
          className="header__btn"
          type="button"
          variant="outlined"
          onClick={() => {
            setOpen(true);
            setSign(false);
          }}
        >
          Sign Up
        </Button>
      </div>
      <Typography variant="h5" color="disabled" className={classes.padding}>
        Sign In Here
      </Typography>
      <form>
        <Input
          className="input"
          type="email"
          value={email}
          name="email"
          placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <Input
          className="input"
          type="password"
          value={password}
          name="password"
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <Button
          type="submit"
          className="submit-btn"
          variant="outlined"
          disableElevation={true}
          onClick={handleSubmit}
        >
          Sign In
        </Button>
      </form>
    </div>
  );

  return (
    <Modal open={sign} onClose={() => setSign(false)}>
      {body}
    </Modal>
  );
}

export default SignInPopUp;
