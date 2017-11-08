import React, { Component } from "react";
import Aux from "../../hoc/Auxy/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import axios from "../../axios-order";

const INGREDIENT_PRICE = {
  salad: 5,
  cheese: 10,
  bacon: 25,
  meat: 30
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0
    },
    totalPrice: 4,
    purchase: false,
    msg: "Please add some ingredients",
    purchasing: false
  };

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(Key => {
        return ingredients[Key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchase: sum > 0 });
  };
  /* addingredientHandler - to add ingredients by button control
    oldCount - old count of the ingredient
    updatedCount - new count of the ingredient
    updatedIngredients */
  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICE[type];
    const newPrice = this.state.totalPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount !== 0) {
      const updatedCount = oldCount - 1;
      const updatedIngredients = {
        ...this.state.ingredients
      };
      updatedIngredients[type] = updatedCount;
      const priceSubtraction = INGREDIENT_PRICE[type];
      const newPrice = this.state.totalPrice - priceSubtraction;
      this.setState({
        totalPrice: newPrice,
        ingredients: updatedIngredients,
        msg: "Please add some ingredients"
      });
      this.updatePurchaseState(updatedIngredients);
    } else
      this.setState({
        msg: "No " + type + " in burger to remove"
      });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseSuccessHandler = () => {
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      costumer: {
        name: "Farid Ansari",
        address: {
          street: "Earth",
          pincode: "123456",
          country: "India"
        },
        "e-mail": "bla@bla.com"
      },
      deliveryMethod: "Flash"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
    //alert("You can Continue!!");
  };
  render() {
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          ordercancel={this.purchaseCancelHandler}
        >
          <OrderSummary
            price={this.state.totalPrice}
            ordercancel={this.purchaseCancelHandler}
            ordersuccess={this.purchaseSuccessHandler}
            ingredients={this.state.ingredients}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} message={this.state.msg} />

        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientSubtracted={this.removeIngredientHandler}
          purchasable={this.state.purchase}
          price={this.state.totalPrice}
          order={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
