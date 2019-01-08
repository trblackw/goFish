import { REGISTER_USER } from "./constants";

export const registerUser = (user, dispatch) => {
  const { username, email, password, city, state } = user;

  fetch("http://localhost:8080/api/users/register", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify({
      username,
      email,
      password,
      city,
      state
    })
  }).then(res => console.log(res));
  return dispatch({ type: REGISTER_USER, user });
};
