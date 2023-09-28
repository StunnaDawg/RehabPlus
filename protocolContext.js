import { createContext, useContext, useState } from 'react';

// Create a Context with default value as an empty array
const SingleProtocolContext = createContext([]);

// Create a custom hook to use the context
export const useSingleProtocolContext = () => {
  return useContext(SingleProtocolContext);
};

// Create a Provider component
export const SingleProtocolProvider = ({ children }) => {
  const [protocolEditData, setProtocolEditData] = useState([]);

  return (
    <SingleProtocolContext.Provider value={[protocolEditData, setProtocolEditData]}>
      {children}
    </SingleProtocolContext.Provider>
  );
};