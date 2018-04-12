const DEFAULT_STATE = {
};

export default (state = DEFAULT_STATE, {type, user}) => {
  switch(type) {
  case "USER_SET":
    {
      return user;
    }
  default:
    {
      return state;
    }
    // eslint-disable-next-line
  };
};
