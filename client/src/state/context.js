import { createContext } from "react";

const UserContext = createContext({
  currentUser: {
    id: "",
    searchHistory: [],
    favorites: [],
    preferences: {},
    sessionLength: ""
  }
});

export default UserContext;
