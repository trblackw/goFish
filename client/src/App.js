import React, { useContext, useReducer } from "react";
import "./App.css";
import { Router } from "@reach/router";
import Landing from "./components/Landing";
import Nav from "./components/Nav";
import Register from "./components/Register";
import Login from "./components/Login";
import UserContext from "./state/context";
import UserReducer from "./state/reducer";
import Demo from "./components/Demo";
import UserLanding from "./components/UserLanding";

const App = () => {
  const initialState = useContext(UserContext);
  const [{ currentUser }, dispatch] = useReducer(UserReducer, initialState);
  return (
    <>
      <UserContext.Provider value={{ currentUser, dispatch }}>
        <Nav />
        <Router>
          <Landing path="/" />
          <Demo path="/demo" />
          <UserLanding path="/user/:id" />
          <Login path="login" />
          <Register path="register" />
        </Router>
      </UserContext.Provider>
    </>
  );
};

export default App;
