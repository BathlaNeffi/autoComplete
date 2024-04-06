// import necessary modules
import { useState } from "react";
// imported Product interface 
import { Product } from "./App";
  

  
// Custom hook for fetching data from API
  export const useFetchData = (url: string) => {
//  Declare State Variable  using useState Hook
    const [data, setData] = useState<Product[]>([]);
//  fetch data function to fetch the data from the API
    const fetchData = async (query: string) => {
      try {
        let res = await fetch(url);
        //  Parse response to JSON
        let jsonData = await res.json();
        //  Elimating non relavant fields and keeping those which are required and maintaing the format
        jsonData = jsonData.map((item: Product) => ({ id: item.id, title: item.title }));
        //  Filtering the Data based on query match and setting it to the state
        setData(
            jsonData.filter((option:Product)=>option.title.toLowerCase().includes(query.toLowerCase())).splice(0,10)
        );
      } catch (error) {
        // Log Error in case there is some error while fetching data from API
        console.log("Error In Fetching Data ==>", error);
      }
    };
    // Return the values required in the App component
    return { data, fetchData , setData};
  };