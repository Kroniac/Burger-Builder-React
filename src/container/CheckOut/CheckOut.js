import React, { Component } from "react";
import CheckOutSummary from "../../components/Order/CheckOutSummary/CheckOutSummary";

class CheckOut extends Component {
  state = {
    ingredients: {
      cheese: 1,
      salad: 1,
      bacon: 1,
      meat: 1
    }
  };
  /* for parsing through query params passed thorugh burgerbuider page
and get the ingredients value */
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let params of query.entries()) {
      ingredients[params[0]] = +params[1];
    }
    this.setState({ingredients: ingredients})
  }
  checkoutCancel = () => {
    this.props.history.goBack();
  };
  checkoutContinue = () => {
    this.props.history.replace("/checkout/contact-form");
  };
  render() {
    return (
      <div>
        <CheckOutSummary
          cancel={this.checkoutCancel}
          continue={this.checkoutContinue}
          ingredients={this.state.ingredients}
        />
      </div>
    );
  }
}

export default CheckOut;
