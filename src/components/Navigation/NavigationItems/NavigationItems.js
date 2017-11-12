import React from "react";
import classes from "./NavigationItems.css";
import {NavLink} from "react-router-dom"

const navagationItems = props => (
  <ul className={classes.NavigationItems}>
    <li className={classes.NavigationItem}>
      <NavLink to="/" className={classes.active}>Burger Builder</NavLink>
      <NavLink to="/checkout" >CheckOut</NavLink>
    </li>
  </ul>
);

export default navagationItems;
