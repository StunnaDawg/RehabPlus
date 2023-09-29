import { createContext, useContext, useState } from 'react';

const SingleClientContext = createContext([]);

export const useSingleClientContext = () => {
  return useContext(SingleClientContext);
};

export const SingleClientProvider = ({ children }) => {
  const [clientEditData, setClientEditData] = useState([]);

  return (
    <SingleClientContext.Provider value={[clientEditData, setClientEditData]}>
      {children}
    </SingleClientContext.Provider>
  );
};