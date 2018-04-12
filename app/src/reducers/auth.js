const DEFAULT_STATE = {
  email: null,
  password: null,
  token: null,
};

export default (state = DEFAULT_STATE, {type, email, password, token}) => {
  switch(type) {
  case "AUTH_SET_USER":
    {
      return {
        ...state,
        email,
        password,
      };
    }
  case "AUTH_SET_TOKEN":
    {
      return {
        ...state,
        token,
      };
    }
  default:
    {
      return state;
    }
    // eslint-disable-next-line
  };
};
