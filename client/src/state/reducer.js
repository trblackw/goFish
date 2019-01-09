import { REGISTER_USER, LOGIN_USER } from "./constants";

const UserReducer = (state, action) => {
  const { type, registeredUser, loggedInUser, success } = action;
  switch (type) {
    case REGISTER_USER:
      console.log(
        `%c {type: REGISTER_USER, registeredUser: ${JSON.stringify(registeredUser)}} `,
        "color: yellow; font-weight: bold"
      );
      return success ? { ...state, currentUser: registeredUser } : state;
    case LOGIN_USER:
      console.log(
        `%c {type: LOGIN_USER, loggedInUser: ${JSON.stringify(loggedInUser)}} `,
        "color: teal; font-weight: bold"
      );
      return success ? { ...state, currentUser: loggedInUser } : state;
    default:
      return state;
  }
};

export default UserReducer;
