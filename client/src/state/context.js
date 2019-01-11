import { createContext } from "react";

const UserContext = createContext({
  currentUser: {
    _id: "",
    searchHistory: [],
    favorites: [],
    preferences: {},
    sessionLength: ""
  }
});

export default UserContext;
