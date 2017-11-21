import React from "react";
import classes from "./NavigationItems.css";
import { NavLink } from "react-router-dom";

const navagationItems = props => {
  const authHead = props.isAuthenticated ? (
    <NavLink activeClassName={classes.active} to="/logout">
      Logout
    </NavLink>
  ) : (
    <NavLink activeClassName={classes.active} to="/auth">
      Authenticate
    </NavLink>
  );
  const order = props.isAuthenticated ? (
    <NavLink activeClassName={classes.active} to="/orders">
      Orders
    </NavLink>
  ) : null;
  return (
    <ul className={classes.NavigationItems}>
      <li className={classes.NavigationItem}>
        <NavLink activeClassName={classes.active} exact to="/">
          Burger Builder
        </NavLink>
        {order}
        {authHead}
      </li>
    </ul>
  );
};
export default navagationItems;
