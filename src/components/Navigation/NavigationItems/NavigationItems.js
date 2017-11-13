import React from "react";
import classes from "./NavigationItems.css";
import {NavLink} from "react-router-dom"

const navagationItems = props => (
  <ul className={classes.NavigationItems}>
    <li className={classes.NavigationItem}>
      <NavLink activeClassName={classes.active} exact to="/">Burger Builder</NavLink>
      <NavLink activeClassName={classes.active}  to="/orders" >Orders</NavLink>
    </li>
  </ul>
);

export default navagationItems;
