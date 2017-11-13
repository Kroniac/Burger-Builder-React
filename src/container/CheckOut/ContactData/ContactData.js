import React, { Component } from "react";
import Button from "../../..//components/UI/Button/Button";
import Classes from "./ContactData.css";
import axios from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";
class ContactData extends Component {
  state = {
    name: "",
    "e-mail": "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };
  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
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
        <input type="text" name="name" placeholder="your name" />
        <input type="email" name="e-mail" placeholder="your e-mail" />
        <input type="text" name="street" placeholder="your street" />
        <input type="text" name="postal" placeholder="your postal-code" />
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
