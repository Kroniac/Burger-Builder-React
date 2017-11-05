import React from "react";
import Aux from "../../hoc/Aux";
const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(Key => {
    return (
      <li>
        <span style={{ textTransform: "capitalize" }}>{Key}</span>:{" "}
        {props.ingredients[Key]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Order Summary</h3>
      <p>A very delicious Burger with following ingredients: </p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to Checkout??</p>
    </Aux>
  );
};

export default orderSummary;
