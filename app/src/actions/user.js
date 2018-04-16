import * as api from '../api';

const delayS = (delayInSeconds) => {
  return (value) => new Promise((resolve) => {
    setTimeout(() => resolve(value), delayInSeconds * 1000);
  });
};

export function userSignUp(values, history) {
  return (dispatch) => {
    api.userSignUp(values)
      .then(({data: {qrcode}}) => {
        dispatch({
          type: "USER_SET_QRCODE",
          qrcode,
        });
        return delayS(0.1)()
          .then((path) => {
            history.push("/signup/success");
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
