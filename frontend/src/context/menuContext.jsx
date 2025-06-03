import { createContext, useState, useEffect,useContext } from "react";
import { CollectionContext } from "./collectionContext";
import axios from "axios";

// Create the Utility context
export const UtilityContext = createContext();


const UtilityProvider = ({ children }) => {
  // State for menu data
  const [menu, setMenu] = useState([]);
  
  

  // Fetch menu data from API on mount
  useEffect(() => {
    fetchMenu();
   
  }, []);

  /**
   * Fetch menu data from the backend 
   */
  const fetchMenu = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/getmenu`);
      setMenu(res.data);
    } catch (err) {
      console.log("Menu fetch failed:", err);
    }
  };



 


  
    





  // Provide menu data 
  return (
    <UtilityContext.Provider value={{ menu}}>
      {children}
    </UtilityContext.Provider>
  );
};

export default UtilityProvider;
