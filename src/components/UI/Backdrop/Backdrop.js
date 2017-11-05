import React from "react";
import classes from "./Backdrop.css";

const backDrop = props =>
  props.show ? <div className={classes.Backdrop} /> : null;

export default backDrop;
