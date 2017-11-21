import React, { Component } from "react";
import Button from "../../..//components/UI/Button/Button";
import Classes from "./ContactData.css";
import axios from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as orderBurgerAction from "../../../store/actions/index";
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: " text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true,
          minLength: 3,
          maxLength: 15
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: " text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 25
        },
        valid: false,
        touched: false
      },
      pincode: {
        elementType: "input",
        elementConfig: {
          type: " text",
          placeholder: "Pincode"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 6
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: " text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true,
          minLength: 4,
          maxLength: 10
        },
        valid: false,
        touched: false
      },
      "e-mail": {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-mail"
        },
        value: "",
        validation: {
          required: true,
          minLength: 3,
          maxLength: 12
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest",
        valid: true,
        touched: false
      }
    },
    formIsValid: false
  };
  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    let formElement = {};
    for (let key in this.state.orderForm) {
      formElement[key] = this.state.orderForm[key].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      customer: formElement,
      userId: this.props.userId
    };
    this.props.onOrderBurger(order, this.props.token);
  };
  onChangeHandler = (event, formId) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[formId]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[formId] = updatedFormElement;
    let formIsValid = true;
    for (let key in updatedOrderForm) {
      formIsValid = updatedOrderForm[key].valid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  /*checking validity of the values according to defined rules in state: validation*/
  checkValidity(value, rules) {
    if (!rules) return true; // for the state where validation is present
    if (rules.required) if (value.trim() === "") return false;
    if (rules.minLength) if (value.length < rules.minLength) return false;
    if (rules.maxLength) if (value.length > rules.maxLength) return false;
    return true;
  }
  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={event => this.onChangeHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          {" "}
          Order{" "}
        </Button>
      </form>
    );
    if (this.props.loading) form = <Spinner />;
    return (
      <div className={Classes.ContactData}>
        <h4>Enter Your Contact Data </h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalprice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(orderBurgerAction.purchaseBurger(orderData, token))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(ContactData, axios)
);
