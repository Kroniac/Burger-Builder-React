import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-order";
import errorHandler from "../../hoc/withErrorHandler/withErrorHandler";
class Orders extends Component {
  state = {
    order: [],
    loading: true
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then(res => {
        let fetchedData = [];
        for (let key in res.data)
          fetchedData.push({
            ...res.data[key],
            id: key
          });
        this.setState({ loading: false, order: fetchedData });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }
  render() {
    return (
      
      <div>
       { this.state.order.map(order => (
         <Order key={order.id}
         ingredients = {order.ingredients}
         totalPrice = {+order.price} />
       ))}
      </div>
    );
  }
}

export default errorHandler(Orders, axios);
