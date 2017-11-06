import React, { Component } from "react";
import Aux from "../Auxy/Aux";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  showSideDrawerHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  toggleMenuHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar toggleMenu={this.toggleMenuHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.showSideDrawerHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
