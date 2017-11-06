import React from "react";
import classes from "./NavigationItems.css";

const navagationItems = props => (
  <ul className={classes.NavigationItems}>
    <li className={classes.NavigationItem}>
      <a href="/" className={classes.active}>Burger Builder</a>
      <a href="/" >CheckOut</a>
    </li>
  </ul>
);

export default navagationItems;
