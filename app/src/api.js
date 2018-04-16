import axios from "axios";

const apiHost = process.env.NODE_ENV === "production" ? "/" : "http://localhost:3001/";

export function authLogin({email, password, sendSMS}) {
  return axios({
    method: "post",
    url: `${apiHost}api/auth/code`,
    data: {email, password, sendSMS},
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

export function userSignUp(values) {
  return axios({
    method: "post",
    url: `${apiHost}api/users`,
    data: values,
  }).then((result) => {
    console.info("userSignUp", {result});
    return result;
  }, (error) => {
    console.error("userSignUp", {error});
    return Promise.reject(error);
  });
}

export function userInfo({token}) {
  return axios({
    method: "get",
    url: `${apiHost}api/users/me`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((result) => {
    console.info("userInfo", {result});
    return result;
  }, (error) => {
    console.error("userInfo", {error});
    return Promise.reject(error);
  });
}
