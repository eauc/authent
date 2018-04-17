import _ from 'lodash';
import * as api from '../api';

const delayS = (delayInSeconds) => {
  return (value) => new Promise((resolve) => {
    setTimeout(() => resolve(value), delayInSeconds * 1000);
  });
};

export function userSignUp(values, history) {
  return (dispatch) => {
    const userData = {
      ...values,
      phoneNumber: _.isEmpty(values.phoneNumber) ? undefined : values.phoneNumber,
    };
    api.userSignUp(userData)
      .then(({data: {qrcode, secret}}) => {
        dispatch({
          type: "USER_SET",
          user: {
            ...values,
            qrcode,
            secret,
          },
        });
        return delayS(0.1)()
          .then((path) => {
            history.push("/signup/confirm");
          });
      }, (error) => {
        history.push("/signup/error");
        return delayS(2)()
          .then((path) => {
            history.push("/signup");
          });
      });
  };
};

export function userSignUpConfirm({code}, history) {
  return (dispatch, getState) => {
    const {user: {email, password}} = getState();
    api.authLoginCode({
      code,
      email,
      password,
    }).then(() => {
      history.push("/signup/success");
    }, (error) => {
      history.push("/signup/error");
      return delayS(2)()
        .then((path) => {
          history.push("/signup");
        });
    });
  };
};

export function userInfo({token}, history) {
  return (dispatch) => {
    api.userInfo({token})
      .then(({data: user}) => {
        dispatch({
          type: "USER_SET",
          user,
        });
      }, (error) => {
        dispatch({
          type: "AUTH_SET_TOKEN",
          token: null,
        });
      });
  };
}
