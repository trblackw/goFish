import { REGISTER_USER } from "./constants";

const UserReducer = (state, action) => {
  const { type, user } = action;
  switch (type) {
    case REGISTER_USER:
      console.log(
        `%c {type: REGISTER_USER, user: ${JSON.stringify(user)}} `,
        "color: yellow; font-weight: bold"
      );
      return {
        ...state,
        user
      };
    default:
      return state;
  }
};

export default UserReducer;
