// Import Styles 
import './App.css';
// import Components
import AutoComplete from './components/autoComplete';
import ErrorBoundary from './ErrorBoundary';
// import custom hook for fetching data
import {  useFetchData } from './useApp';
// Declare interface for the product
export interface Product{
  id:number;
  title:string;
}
// App Component that is of type React functional component
const App:React.FC=()=> {
  // Destructuring  from useFetchData hook
  const { data, fetchData,  setData} = useFetchData("https://fakestoreapi.com/products");
  // Declare this so as we can use this when deBouncing
  let timeoutId:ReturnType<typeof setTimeout> | null = null;
  //  Created function that helps in calling new set of data when user input changes  NOTE: here I have used Debouncing to mitigate the unecessary api calls
  const handleInputQuery=(query:string)=>{
    // if there exist An Timout ID clear it before starting anoter setTimout
      if(timeoutId){
        clearTimeout(timeoutId)
      }
      // Set a new Timout to fetch data after 400ms
    timeoutId=setTimeout(()=>{
      // if query is not empty fetch the data as per the query input
      if(query){
        fetchData(query);
        timeoutId=null;
      }else{
        // if query is empty then clear the data
        setData([]);
      }
    },400)
  }
  // Render the App Component
  return (
    <div className="App">
          <h1 className='title'>Auto Complete</h1>
          {/* Error Boundaries so that in case there is any Error the Error bounday will handel those and render resuts */}
          <ErrorBoundary>
            {/* Render AutoComplete Component */}
        { <AutoComplete options={data} handleInputQuery={handleInputQuery}/>}
          </ErrorBoundary>
    </div>
  );
}
// Export the App As default.
export default App;
