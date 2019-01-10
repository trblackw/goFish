import React, { useContext, useEffect } from "react";
import UserContext from "../state/context";

const UserLanding = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <div className="container border-solid border-green p-3">
        <header className="p-3 mx-auto max-w-sm float-left">
          <h3 className="text-4xl text-green font-thin">Welcome back, <span className="font-bold">{currentUser.username}</span></h3> 
        </header>
    </div>
  );
};

export default UserLanding;
