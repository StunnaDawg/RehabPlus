import { createContext, useContext, useState } from 'react';

// Create a Context with default value as an empty array
const EditWorkoutContext = createContext([]);

// Create a custom hook to use the context
export const useSingleEditWorkoutContext = () => {
  return useContext(EditWorkoutContext);
};

// Create a Provider component
export const EditWorkoutContextProvider = ({ children }) => {
  const [editWorkoutData, setEditWorkoutData] = useState([]);

  return (
    <EditWorkoutContext.Provider value={[editWorkoutData, setEditWorkoutData]}>
      {children}
    </EditWorkoutContext.Provider>
  );
};