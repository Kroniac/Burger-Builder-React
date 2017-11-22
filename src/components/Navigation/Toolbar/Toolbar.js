import React from "react";
import classes from "./Toolbar.css";
import classes1 from "./ToggleMenu.css";
import Logo from "../../UI/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

const toolBar = props => (
  <header className={classes.Toolbar}>
    <div className={classes1.DrawerToggle} onClick={props.toggleMenu}>
      <div />
      <div />
      <div />
    </div>
    <p className={classes1.Title}>Fire From Hell Burger Shop</p>
    <Logo />
    <p className={classes.Title}>Fire From Hell Burger Shop</p>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuth} />
    </nav>
  </header>
);

export default toolBar;
