import React, { useEffect, useState } from "react";

export const useFetch = (url , method = 'GET') => {
  const [data, setdata] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [option, setOption] = useState(null);

  const postData = (postdata)=>{
    setOption({
        method : 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postdata)
    })
  }
 
  useEffect(() => {
    const fetchData = (fetchOption) => {
      setIsLoading(true);
      try {
        fetch(url , {...fetchOption})
          .then((response) => response.json())
          .then((data) => setdata(data));
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        setIsLoading(false);
        setError(null);
        setdata(data);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
      if (method === 'GET') {
          fetchData()  
      }
      if (method === 'POST') {
          fetchData(option)  
      }
    };
  }, [url , method , postData] );

  return { data, isLoading, error , postData};
};
