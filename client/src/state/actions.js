import { REGISTER_USER, LOGIN_USER } from "./constants";

export const registerUser = async (user, dispatch) => {
  const { username, email, password, city, state } = user;
  try {
    const registerRes = await fetch(
      "http://localhost:8080/api/users/register",
      {
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
      }
    );
    const { success, user: registerUser } = await registerRes.json();
    if (success)
      return dispatch({ type: REGISTER_USER, registerUser, success });
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (user, dispatch) => {
  const { username, password } = user;
  try {
    const loginRes = await fetch("http://localhost:8080/api/users/login", {
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
        password
      })
    });
    const { success, user: loggedInUser } = await loginRes.json();
    if (success) return dispatch({ type: LOGIN_USER, loggedInUser, success });
  } catch (error) {
    console.error(error);
  }
};
