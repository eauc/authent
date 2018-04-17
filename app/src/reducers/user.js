const DEFAULT_STATE = {
  qrcode: null,
  secret: null,
};

export default (state = DEFAULT_STATE, {type, user, qrcode, secret, phoneNumber}) => {
  switch(type) {
  case "USER_SET":
    {
      return user;
    }
  case "USER_SET_SECRET":
    {
      return {
        ...user,
        qrcode,
        secret,
        phoneNumber,
      };
    }
  default:
    {
      return state;
    }
    // eslint-disable-next-line
  };
};
