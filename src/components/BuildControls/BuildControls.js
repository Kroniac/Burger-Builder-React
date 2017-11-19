import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
  { label: "Salad", type: "salad" }
];

const BuildControls = props => (
  <div className={classes.BuildControls}>
    <p>
      {" "}
      Current Price : <strong> ₹ {props.price.toFixed(2)}</strong>{" "}
    </p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        subtracted={() => props.ingredientSubtracted(ctrl.type)}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.order}
    >
      Order Now
    </button>
  </div>
);

export default BuildControls;
