import React from "react";
import classes from "./Input.css";
const input = props => {
  let input = "";
  switch (props.inputtype) {
    case "input":
      input = <input className={classes.InputElement} {...props} />;
      break;
    case "textarea":
      input = <textarea className={classes.InputElement} {...props} />;
      break;
    default:
      input = input = <input className={classes.InputElement} {...props} />;
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {input}
    </div>
  );
};

export default input;
