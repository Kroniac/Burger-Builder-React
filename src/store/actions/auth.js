import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    console.log(email, password);
    let url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC2kUpgLAowJye5MA_uJu36oFuee2N5V3A";
    if (!isSignUp)
      url =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC2kUpgLAowJye5MA_uJu36oFuee2N5V3A";
    axios
      .post(url, authData)
      .then(response => {
        console.log(response.data);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};
