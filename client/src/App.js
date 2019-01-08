import React, { useContext, useReducer } from "react";
import "./App.css";
import { Router } from "@reach/router";
import Landing from "./components/Landing";
import Nav from "./components/Nav";
import Register from "./components/Register";
import Login from "./components/Login";
import UserContext from "./state/context";
import UserReducer from "./state/reducer";

const App = () => {
  const initialState = useContext(UserContext);
  const [state, dispatch] = useReducer(UserReducer, initialState);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Nav />
        <Router>
          <Landing path="/" />
          <Login path="login" />
          <Register path="register" />
        </Router>
      </UserContext.Provider>
    </>
  );
};

export default App;
