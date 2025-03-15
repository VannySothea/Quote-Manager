import { createContext, useState, useEffect } from "react";
import { dummyQuote } from "../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";

// Create a context
const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  // Navigate
//   const navigate = useNavigate();
//   const location = useLocation();

  // fetch all services
  const [allQuotes, setAllQuotes] = useState([]);

  const fetchAllQuotes = async () => {
    setAllQuotes(dummyQuote);
  }

  useEffect(() => {
    fetchAllQuotes();
  }, []);

  const value = {
    // navigate,
    // hashNavigation,
    allQuotes,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;

