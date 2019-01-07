import { useState, useEffect } from "react";

const useAPI = endpoint => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch(endpoint);
    const responseJSON = await response.json();
    setData(responseJSON.data);
  };

  return data;
};

export default useAPI;
