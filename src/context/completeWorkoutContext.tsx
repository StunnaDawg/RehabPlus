import React, { createContext, useContext, useState } from "react"
import {
  CompleteWorkoutDataType,
  CompleteWorkoutAction,
} from "../@types/context"
import { Workout } from "../@types/firestore"


export type CompleteWorkoutContextType = CompleteWorkoutDataType &
  CompleteWorkoutAction

type CompleteWorkoutContextProviderProps = {
  children: React.ReactNode
}

const CompleteWorkoutContext = createContext<
  CompleteWorkoutContextType | undefined
>(undefined)

export const CompleteWorkoutContextProvider = ({
  children,
}: CompleteWorkoutContextProviderProps) => {
  const [completeWorkoutData, setCompleteWorkoutData] = useState<Workout>({} as Workout)

  return (
    <>
      <CompleteWorkoutContext.Provider
        value={{ completeWorkoutData, setCompleteWorkoutData }}
      >
        {children}
      </CompleteWorkoutContext.Provider>
    </>
  )
}

export const useCompleteWorkoutContext = (): CompleteWorkoutContextType => {
  const context = useContext(CompleteWorkoutContext)
  if (!context) {
    throw new Error(
      "CompleteWorkout must be used within the CompleteWorkoutContextProvider"
    )
  }
  return context
}
