import { createContext, useContext, useState } from 'react';

const RefreshContext = createContext(false);

// Create a custom hook to use the context
export const useRefreshContext = () => {
  return useContext(RefreshContext);
};

// Create a Provider component
export const RefreshContextProvider = ({ children }) => {
  const [refreshKey, setRefreshKey] = useState(false);

  return (
    <RefreshContext.Provider value={[refreshKey, setRefreshKey]}>
      {children}
    </RefreshContext.Provider>
  );
};