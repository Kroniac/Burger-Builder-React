import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckOutSummary.css"

const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Success" clicked={props.continue}>
        Continue...
      </Button>
      <Button btnType="Danger" clicked={props.cancel}>
        Cancel
      </Button>
    </div>
  );
};

export default checkoutSummary;
