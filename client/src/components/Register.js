import React, { useState, useEffect, useContext } from "react";
import States from "../json/states";
import UserContext from "../state/context";
import { REGISTER_USER } from "../state/constants";
import { navigate } from "@reach/router";

//TODO: add autofilling of cities

const initialRegisterFormState = {
  username: "",
  email: "",
  password: "",
  city: "",
  state: ""
};

const Register = () => {
  const { dispatch } = useContext(UserContext);
  const [form, setForm] = useState(initialRegisterFormState);
  const [states, setStates] = useState([]);

  useEffect(() => {
    const statesArr = [];
    for (let state in States) {
      statesArr.push(States[state]);
    }
    setStates(statesArr);
  }, []);

  const handleInput = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setForm(initialRegisterFormState);
    dispatch({ type: REGISTER_USER, user: form });
    navigate("/");
  };
  return (
    <div className="container max-w-md mx-auto my-5 p-2">
      <form className="w-full mx-auto" onSubmit={e => handleSubmit(e)}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-username"
            >
              Username
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-username"
              name="username"
              type="text"
              placeholder="Jane"
              onChange={e => handleInput(e)}
            />
            <p className="text-red text-xs italic">
              Please fill out this field.
            </p>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-email"
            >
              Email
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
              id="grid-email"
              name="email"
              type="email"
              placeholder="Doe"
              onChange={e => handleInput(e)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Password
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-grey"
              id="grid-password"
              name="password"
              type="password"
              placeholder="******************"
              onChange={e => handleInput(e)}
            />
            <p className="text-grey-dark text-xs italic">
              Make it as long and as crazy as you'd like
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-city"
            >
              City <small className="font-thin">(optional)</small>
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
              id="grid-city"
              name="city"
              type="text"
              placeholder="Albuquerque"
              onChange={e => handleInput(e)}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              State <small className="font-thin">(optional)</small>
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey"
                id="grid-state"
                name="state"
                onChange={e => handleInput(e)}
              >
                {states &&
                  states.map(state => (
                    <option value={state} key={state}>
                      {state}
                    </option>
                  ))}
              </select>
              <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-zip"
            >
              Zip <small className="font-thin">(optional)</small>
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
              id="grid-zip"
              type="text"
              placeholder="90210"
            />
          </div>
          <button
            type="submit"
            className="btn bg-green-dark font-bold hover:bg-green-darker p-2 mt-5 rounded border text-white mx-auto"
          >
            Sign me up!
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
