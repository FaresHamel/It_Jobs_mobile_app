import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (endPoint, query ) => {
  
  const [data, seData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endPoint}`,
    params: {
      ...query
    },
    headers: {
      "X-RapidAPI-Key": "05e9284f43msh760d12ccb1f882cp1d6f38jsna81cd7199ad5",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
    }
  };
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      seData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
    
    const refetchData = () => {
        setIsLoading(true);
        fetchData();
    }

    return { data, isLoading, error, refetchData };
};

export default useFetch;