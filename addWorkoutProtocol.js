import { createContext, useContext, useState } from 'react';

// Create a Context with default value as an empty array
const WorkoutContext = createContext([]);

// Create a custom hook to use the context
export const useWorkoutContext = () => {
  return useContext(WorkoutContext);
};

// Create a Provider component
export const WorkoutContextProvider = ({ children }) => {
  const [workoutData, setNewWorkoutData] = useState([]);

  return (
    <WorkoutContext.Provider value={[workoutData, setNewWorkoutData]}>
      {children}
    </WorkoutContext.Provider>
  );
};