import React, { useState, useEffect } from "react";
import useAPI from "../hooks/useAPI";

const Demo = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [results, setResults] = useState(false);

  const fetchAPI = async query => {
    try {
      const res = await fetch(`http://localhost:8080/fishing?search=${query}`);
      const resJSON = await res.json();
      const { success, error, didyoumeans } = resJSON;
      if (typeof resJSON === "string") {
        setResults(true);
        setData(resJSON);
      }
      if (!success && error) {
        return setData("Oops, couldn't find anything for your search");
      }

      console.log(didyoumeans);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    fetchAPI(search);
  };

  //   useEffect(
  //     () => {
  //       console.log(test);
  //     },
  //     [test]
  //   );
  return (
    <div className="container mt-5 mx-auto max-w-md p-3 text-center border-teal-dark">
      <label
        htmlFor="demo"
        className="mb-2 text-grey-darkest font-sans text-lg"
      >
        Make a search
      </label>
      <input
        type="text"
        className="shadow text-green-dark appearance-none border rounded w-full mt-3 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
        name="demo"
        onChange={e => setSearch(e.target.value)}
      />
      <button
        className="bg-green mt-3 border shadow hover:bg-green-dark text-white font-bold py-2 px-4 rounded"
        onClick={handleSearch}
      >
        Go!
      </button>
      {results && (
        <div className="container bg-green-dark text-white p-5 mx-auto my-5 rounded text-center">
          {typeof data === "string" ? data : JSON.stringify(data)}
        </div>
      )}
    </div>
  );
};

export default Demo;
