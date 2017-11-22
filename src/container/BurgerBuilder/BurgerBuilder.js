import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/Auxy/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import axios from "../../axios-order";

class BurgerBuilder extends Component {
  state = {
    msg: "Please add some ingredients"
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }
  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(Key => {
        return ingredients[Key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };
  /* addingredientHandler - to add ingredients by button control
    oldCount - old count of the ingredient
    updatedCount - new count of the ingredient
    updatedIngredients */
  // addIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICE[type];
  //   const newPrice = this.state.totalPrice + priceAddition;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  // removeIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount !== 0) {
  //     const updatedCount = oldCount - 1;
  //     const updatedIngredients = {
  //       ...this.state.ingredients
  //     };
  //     updatedIngredients[type] = updatedCount;
  //     const priceSubtraction = INGREDIENT_PRICE[type];
  //     const newPrice = this.state.totalPrice - priceSubtraction;
  //     this.setState({
  //       totalPrice: newPrice,
  //       ingredients: updatedIngredients,
  //       msg: "Please add some ingredients"
  //     });
  //     this.updatePurchaseState(updatedIngredients);
  //   } else
  //     this.setState({
  //       msg: "No " + type + " in burger to remove"
  //     });
  // };

  purchaseHandler = () => {
    if (this.props.isAuthenticated) this.setState({ purchasing: true });
    else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseSuccessHandler = () => {
    // let queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.state.ingredients[i])
    //   );
    // }
    // queryParams.push("price=" + this.state.totalPrice);
    // const queryString = queryParams.join("&");
    // this.props.history.push({
    //   pathname: "/checkout",
    //   search: "?" + queryString
    // });
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };
  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.props.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <Aux>
          {" "}
          <Burger ingredients={this.props.ings} message={this.state.msg} />
          <BuildControls
            ingredientAdded={this.props.onIngredientsAdded}
            ingredientSubtracted={this.props.onIngredientsRemoved}
            purchasable={this.updatePurchaseState(this.props.ings)}
            price={this.props.price}
            auth={this.props.isAuthenticated}
            order={this.purchaseHandler}
            disabled={disabledInfo}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          price={this.props.price}
          ordercancel={this.purchaseCancelHandler}
          ordersuccess={this.purchaseSuccessHandler}
          ingredients={this.props.ings}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          ordercancel={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>

        {burger}
      </Aux>
    );
  }
}

const mapStatetoProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalprice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    onIngredientsAdded: ingName => dispatch(actions.addIngredient(ingName)),

    onIngredientsRemoved: ingName =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: path => dispatch(actions.authRedirectPath(path))
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(
  withErrorHandler(BurgerBuilder, axios)
);
