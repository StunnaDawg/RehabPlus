import { createContext, useContext, useState } from 'react';

// Create a Context with default value as an empty array
const NewProtocolContext = createContext([]);

// Create a custom hook to use the context
export const useNewProtocolContext = () => {
  return useContext(NewProtocolContext);
};

// Create a Provider component
export const NewProtocolContextProvider = ({ children }) => {
  const [newProtocolData, setNewProtocol] = useState([]);

  return (
    <NewProtocolContext.Provider value={[newProtocolData, setNewProtocol]}>
      {children}
    </NewProtocolContext.Provider>
  );
};