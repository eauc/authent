import axios from "axios";

const apiHost = process.env.NODE_ENV === "production" ? "/" : "http://localhost:3001/";

export function authLogin({email, password}) {
  return axios({
    method: "post",
    url: `${apiHost}api/auth/code`,
    data: {email, password},
  }).then((result) => {
    console.info("authLogin", {result});
    return result;
  }, (error) => {
    console.error("authLogin", {error});
    return Promise.reject(error);
  });
}

export function authLoginCode({email, password, code}) {
  return axios({
    method: "post",
    url: `${apiHost}api/auth/token`,
    data: {
      email,
      password,
      code,
    },
  }).then((result) => {
    console.info("authLoginCode", {result});
    return result;
  }, (error) => {
    console.error("authLoginCode", {error});
    return Promise.reject(error);
  });
}
