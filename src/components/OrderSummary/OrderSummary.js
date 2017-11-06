import React from "react";
import Aux from "../../hoc/Aux";
import Button from "../UI/Button/Button";

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(Key => {
    return (
      <li key={Key}>
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
      <p><strong>Total Price: {props.price}</strong></p>
      <p>Continue to Checkout??</p>
      <Button btnType="Danger" clicked={props.ordercancel} >Cancel</Button>
      <Button btnType="Success" clicked={props.ordersuccess}>Continue...</Button>
    </Aux>
  );
};

export default orderSummary;
