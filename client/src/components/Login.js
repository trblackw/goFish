import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import { loginUser } from "../state/actions";
import { useContext } from "react";
import UserContext from "../state/context";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: ""
  });
  const { dispatch, currentUser } = useContext(UserContext);

  useEffect(
    () => {
      if (currentUser._id !== "") {
        navigate(`/user/${currentUser._id}`);
      }
    },
    [currentUser]
  );

  const handleInput = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    loginUser(user, dispatch);
    //  navigate(`/user/${currentUser._id}`);
  };

  return (
    <div className="w-full max-w-md mx-auto my-6">
      <form
        className="bg-green shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={e => handleSubmit(e)}
      >
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
            name="username"
            type="text"
            placeholder="Username"
            onChange={e => handleInput(e)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
            name="password"
            type="password"
            placeholder="******************"
            onChange={e => handleInput(e)}
          />
          {/* <p className="text-red text-xs italic">Please choose a password.</p> */}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-green-lighter hover:bg-green-lightest text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-white hover:text-white-darker"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
      <p className="text-center text-grey text-xs">
        ©2018 goFish. All rights reserved.
      </p>
    </div>
  );
};

export default Login;
