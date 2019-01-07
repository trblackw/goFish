import React from "react";
import "./App.css";
import { Router } from "@reach/router";
import Landing from "./components/Landing";
import Nav from "./components/Nav";

const App = () => (
  <>
    <Nav />
    <Router>
      <Landing path="/" />
    </Router>
  </>
);

export default App;
