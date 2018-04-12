import * as api from "../api";

export function authLogin({email, password}, history) {
  return (dispatch) => {
    api.authLogin({email, password})
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
  return () => {
    api.authLoginCode({email, password, code})
      .then((result) => {
        history.push("/");
      }, (error) => {
        history.push("/login/error");
        setTimeout(() => {
          history.push("/login");
        }, 2000);
      });
  };
}
