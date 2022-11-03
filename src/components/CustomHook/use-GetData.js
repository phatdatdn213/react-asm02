import { useEffect } from "react";

// Creat custom hook to get data from api
const useGetData = (link, handle, depence) => {
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(link); // Add link to get data for each category

      const data = await response.json();

      handle(data); // Handle data
    };
    getData().catch((err) => {
      console.log(err.message); // Render error message to console if have error
    });
  }, [depence, link, handle]);
};

export default useGetData;
