import React from "react";
import classes from "./Order.css";
const order = props => {
  let ingredients = [];
  for (let key in props.ingredients) {
    ingredients.push({
      ingredientName: key,
      quantity: props.ingredients[key]
    });
  }
  const ingredientOutput = ingredients.map(ig => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "2px solid #ccc",
          padding: "5px"
        }}
        key={ig.ingredientName}
      >
        {ig.ingredientName} {ig.quantity}
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients : {ingredientOutput}</p>
      <p>
        Price: <strong>₹ {props.totalPrice}</strong>
      </p>
    </div>
  );
};

export default order;
