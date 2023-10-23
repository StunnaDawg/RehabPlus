import { createContext, useContext, useState } from 'react';

// Create a Context with default value as an empty array
const ExerciseContext = createContext([]);

// Create a custom hook to use the context
export const useSingleWorkoutContext = () => {
  return useContext(ExerciseContext);
};

// Create a Provider component
export const ExerciseContextProvider = ({ children }) => {
  const [exerciseWorkoutData, setExerciseWorkoutData] = useState([]);

  return (
    <ExerciseContext.Provider value={[exerciseWorkoutData, setExerciseWorkoutData]}>
      {children}
    </ExerciseContext.Provider>
  );
};