import { use } from "react";
import Search from "./components/Search";
import { useState, useEffect} from "react";
const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("Search term changed:", searchTerm);
  }, [searchTerm]);
  
  return (
    <>
    <Search></Search>
    </>
  );
};

export default App;
