const DEFAULT_STATE = {
  email: null,
  password: null,
};

export default (state = DEFAULT_STATE, {type, email, password}) => {
  switch(type) {
  case "AUTH_SET_USER":
    {
      return {
        ...state,
        email,
        password,
      };
    }
  default:
    {
      return state;
    }
    // eslint-disable-next-line
  };
};
