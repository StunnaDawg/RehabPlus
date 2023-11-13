import React, { createContext, useContext, useState } from "react"
import {SingleWorkoutAction, SingleWorkoutType} from '../@types/context'
import { Workout } from "../@types/firestore"

export type SingleWorkoutContextType = SingleWorkoutType & SingleWorkoutAction

type SingleWorkoutContextProviderProps = {
  children: React.ReactNode
}

const SingleWorkoutContext = createContext<SingleWorkoutContextType | undefined>(undefined)

export const SingleWorkoutContextProvider = ({
  children,
}: SingleWorkoutContextProviderProps) => {
  const [exerciseWorkoutData, setExerciseWorkoutData] = useState<Workout>({} as Workout)


  return (
    <>
    <SingleWorkoutContext.Provider value={{ exerciseWorkoutData, setExerciseWorkoutData}}>
      {children}
    </SingleWorkoutContext.Provider>
    </>
  )
}

export const useSingleWorkoutContext = (): SingleWorkoutContextType => {
  const context = useContext(SingleWorkoutContext);
  if (!context) {
      throw new Error('SingleWorkout must be used within the SingleWorkoutContextProvider');
  }
  return context;
};


