import React from "react";
import classes from "./Input.css";
const input = props => {
  let input = "";
  switch (props.elementType) {
    case "input":
      input = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      input = (
        <textarea
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      input = (
        <select
          className={classes.InputElement}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;

    default:
      input = input = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {input}
    </div>
  );
};

export default input;
