import * as api from '../api';

const delayS = (delayInSeconds) => {
  return (value) => new Promise((resolve) => {
    setTimeout(() => resolve(value), delayInSeconds * 1000);
  });
};

export function userSignUp(values, history) {
  return () => {
    api.userSignUp(values)
      .then((result) => {
        history.push("/signup/success");
        return "/login";
      }, (error) => {
        history.push("/signup/error");
        return "/signup";
      })
      .then(delayS(2))
      .then((path) => {
        history.push(path);
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
