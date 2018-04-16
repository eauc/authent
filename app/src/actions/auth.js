import * as api from "../api";

export function authLogin({email, password, sendSMS}, history) {
  return (dispatch) => {
    api.authLogin({email, password, sendSMS})
      .then((result) => {
        history.push("/login/code");
        dispatch({
          type: "AUTH_SET_USER",
          email,
          password,
        });
      }, (error) => {
        history.push("/login/error");
        setTimeout(() => {
          history.push("/login");
        }, 2000);
      });
  };
}

export function authLoginCode({email, password}, {code}, history) {
  return (dispatch) => {
    api.authLoginCode({email, password, code})
      .then(({data: {token}}) => {
        dispatch({
          type: "AUTH_SET_TOKEN",
          token,
        });
        setTimeout(() => {
          history.push("/");
        }, 200);
      }, (error) => {
        history.push("/login/error");
        setTimeout(() => {
          history.push("/login");
        }, 2000);
      });
  };
}
