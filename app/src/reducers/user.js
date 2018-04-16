const DEFAULT_STATE = {
  qrcode: null,
};

export default (state = DEFAULT_STATE, {type, user, qrcode}) => {
  switch(type) {
  case "USER_SET":
    {
      return user;
    }
  case "USER_SET_QRCODE":
    {
      return {
        ...user,
        qrcode,
      };
    }
  default:
    {
      return state;
    }
    // eslint-disable-next-line
  };
};
