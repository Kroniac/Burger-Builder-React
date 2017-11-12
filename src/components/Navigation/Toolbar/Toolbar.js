import React from "react";
import classes from "./Toolbar.css";
import classes1 from "./ToggleMenu.css";
import Logo from "../../UI/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

const toolBar = props => (
  <header className={classes.Toolbar}>
    <div className={classes1.DrawerToggle} onClick={props.toggleMenu}>
      <div />
    </div>
    <Logo />
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolBar;
