import React, { Component } from "react";
import Button from "../../..//components/UI/Button/Button";
import Classes from "./ContactData.css";
import axios from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: " text",
          placeholder: "Your Name"
        },
        value: ""
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: " text",
          placeholder: "Street"
        },
        value: ""
      },
      pincode: {
        elementType: "input",
        elementConfig: {
          type: " text",
          placeholder: "Pincode"
        },
        value: ""
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: " text",
          placeholder: "Country"
        },
        value: ""
      },
      "e-mail": {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-mail"
        },
        value: ""
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: ""
      }
    },
    loading: false
  };
  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
        // console.log(response);
      })
      .catch(error => {
        this.setState({ loading: false });
        //console.log(error)
      });
  };
  if;
  render() {
    let form = (
      <form>
        <Input elementType="..." elementConfig="..." value="..." />
        <Input
          inputtype={"input"}
          type="email"
          name="e-mail"
          placeholder="your e-mail"
        />
        <Input
          inputtype={"input"}
          type="text"
          name="street"
          placeholder="your street"
        />
        <Input
          inputtype={"input"}
          type="text"
          name="postal"
          placeholder="your postal-code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          {" "}
          Order{" "}
        </Button>
      </form>
    );
    if (this.state.loading) form = <Spinner />;
    return (
      <div className={Classes.ContactData}>
        <h4>Enter Your Contact Data </h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
