import React, { useEffect } from "react";
import { Link } from "@reach/router";
import useAPI from "../hooks/useAPI";

const Landing = () => {
  return (
    <div className="container mx-auto max-w-md p-3 bg-green-lighter text-black shadow-md rounded mt-5">
      <h2 className="mb-3">
        Welcome to <b>goFish</b>
      </h2>
      <p className="font-thin">
        This app is designed to extend beyond your average google search,
        providing users with varying depths of information depending on their
        requirements. Registered users are able to archive and index their
        searches, allowing goFish to be a sustainable repository of
        computationally-based information
      </p>
      <br />
      <p className="text-center">
        This application is completely free and registering should be relatively
        effortless!
      </p>
      <Link to="/demo">
        <button className="btn bg-green-dark hover:bg-green-light p-2 rounded text-white mt-4 mx-auto">
          Play with the app
        </button>
      </Link>
    </div>
  );
};

export default Landing;
