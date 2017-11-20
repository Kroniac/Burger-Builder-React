import React, { Component } from "react";
import { connect } from "react-redux";
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
        <Toolbar
          isAuth={this.props.isAuth}
          toggleMenu={this.toggleMenuHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuth}
          open={this.state.showSideDrawer}
          closed={this.showSideDrawerHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};
export default connect(mapStateToProps)(Layout);
