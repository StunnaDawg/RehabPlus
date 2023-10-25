import { createContext, useContext, useState } from 'react';

// Create a Context with default value as an empty array
const PhasesContext = createContext([]);

// Create a custom hook to use the context
export const usePhasesContext = () => {
  return useContext(PhasesContext);
};

// Create a Provider component
export const PhasesContextProvider = ({ children }) => {
  const [phasesData, setPhasesData] = useState([]);

  return (
    <PhasesContext.Provider value={[phasesData, setPhasesData]}>
      {children}
    </PhasesContext.Provider>
  );
};