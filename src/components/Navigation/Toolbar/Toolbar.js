import React from "react";
import classes from "./Toolbar.css"
import Logo from "../../UI/Logo/Logo"

const toolBar = props => (
  <header className={classes.Toolbar}>
    <div>Menu</div>
    <Logo />
    <nav>
      <ul>...</ul>
    </nav>
  </header>
);

export default toolBar;
