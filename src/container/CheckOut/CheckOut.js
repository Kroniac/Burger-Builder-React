import React, { Component } from "react";
import CheckOutSummary from "../../components/Order/CheckOutSummary/CheckOutSummary";
import ContactData from "./ContactData/ContactData";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
class CheckOut extends Component {
  // state = {
  //   ingredients: null,
  //   totalprice: 0
  // };
  /* for parsing through query params passed thorugh burgerbuider page
and get the ingredients value */
  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //   for (let params of query.entries()) {
  //     if (params[0] === "price") {
  //       price = +params[1];
  //     } else ingredients[params[0]] = +params[1];
  //   }
  //   this.setState({ ingredients: ingredients, totalprice: price });
  // }
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
          ingredients={this.props.ings}
        />
        <Route
          path={this.props.match.path + "/contact-form"}
          /* render={props => (
            // <ContactData
            //   ingredients={this.state.ingredients}
            //   price={this.state.totalprice}
            //   {...props}
            // />
          )} */
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients
  };
};

//no mapDispatchtoProps, cuz nothing is required to dispatch to reducer

export default connect(mapStateToProps)(CheckOut);
