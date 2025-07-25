import { createContext, useContext, useState } from "react";

const GlobalMessageContext = createContext();

export const GlobalMessageProvider = ({ children }) => {
  const [globalMessage, setGlobalMessage] = useState({ text: "", type: "" });

  return (
    <GlobalMessageContext.Provider value={{ globalMessage, setGlobalMessage }}>
      {children}
    </GlobalMessageContext.Provider>
  );
};

export const useGlobalMessage = () => useContext(GlobalMessageContext);
