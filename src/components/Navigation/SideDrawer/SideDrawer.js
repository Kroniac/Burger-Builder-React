import React from "react";
import Logo from "../../UI/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";
import Aux from "../../../hoc/Aux"
import Backdrop from "../../UI/Backdrop/Backdrop"

const sideDrawer = (props) => {
  return (
      <Aux>
    <Backdrop show={props.open} clicked = {props.closed} />
    <div className={classes.SideDrawer}>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav>
        <NavigationItems />
      </nav>
    </div>
    </Aux>
  );
};

export default sideDrawer;
