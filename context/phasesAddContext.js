import { createContext, useContext, useState } from 'react';

// Create a Context with default value as an empty array
const PhasesContext = createContext();

// Create a custom hook to use the context
export const useCurrentPhasesContext = () => {
  return useContext(PhasesContext);
};

// Create a Provider component
export const PhasesContextProvider = ({ children }) => {
  const [currentPhasesData, setCurrentPhasesData] = useState();
  return (
    <PhasesContext.Provider value={[currentPhasesData, setCurrentPhasesData]}>
      {children}
    </PhasesContext.Provider>
  );
};