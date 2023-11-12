import { createContext, useContext, useState } from 'react';

// Create a Context with default value as an empty array
const CompleteWorkoutContext = createContext([]);

// Create a custom hook to use the context
export const useCompleteWorkoutContext = () => {
  return useContext(CompleteWorkoutContext);
};

// Create a Provider component
export const CompleteWorkoutContextProvider = ({ children }) => {
  const [completeWorkoutData, setCompleteWorkoutData] = useState([]);

  return (
    <CompleteWorkoutContext.Provider value={[completeWorkoutData, setCompleteWorkoutData]}>
      {children}
    </CompleteWorkoutContext.Provider>
  );
};