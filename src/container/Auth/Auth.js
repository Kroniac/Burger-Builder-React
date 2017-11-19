import React, { Component } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";
import * as action from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: " email",
          placeholder: "Email Address"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: " password",
          placeholder: "password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignUp: true
  };
  /*checking validity of the values according to defined rules in state: validation*/
  checkValidity(value, rules) {
    if (!rules) return true; // for the state where validation is present
    if (rules.required) if (value.trim() === "") return false;
    if (rules.minLength) if (value.length < rules.minLength) return false;
    if (rules.maxLength) if (value.length > rules.maxLength) return false;
    return true;
  }
  inputChangeHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };
    this.setState({ controls: updatedControls });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  switchAuthMode = () => {
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp };
    });
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    let form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={event => this.inputChangeHandler(event, formElement.id)}
      />
    ));
    if (this.props.loading) form = <Spinner />;
    let error = null;
    if (this.props.error) {
      error = <p>{this.props.error.message}</p>;
    }
    return (
      <div className={classes.Auth}>
        {error}
        <form onSubmit={this.onSubmitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthMode}>
          Switch To {this.state.isSignUp ? "Sign-In" : "Sign-Up"}
        </Button>
      </div>
    );
  }
}

export const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  };
};
export const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(action.auth(email, password, isSignUp))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
