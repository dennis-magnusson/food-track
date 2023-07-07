// context/AppProvider.js
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { getDayData } from "../services/databaseService";
import AppContext from "./AppContext";

const AppProvider = ({ children }) => {
  const [dayData, setDayData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const date = format(new Date(), "yyyy-MM-dd");
      const data = await getDayData();
      setDayData(data);
    };

    fetchData();
  }, []);

  return <AppContext.Provider value={dayData}>{children}</AppContext.Provider>;
};

export default AppProvider;
