import React, { createContext, useContext, useState } from "react"
import { ExercisesContextAction, ExercisesContextType } from "../@types/context"
import { WorkoutExercise } from "../@types/firestore"

export type ExerciseContextTyping = ExercisesContextType &
  ExercisesContextAction

type ExerciseContextProviderProps = {
  children: React.ReactNode
}

const ExerciseContext = createContext<ExerciseContextTyping | undefined>(
  undefined
)

export const ExerciseContextProvider = ({
  children,
}: ExerciseContextProviderProps) => {
  const [exerciseData, setExerciseData] = useState<WorkoutExercise[]>([])

  return (
    <>
      <ExerciseContext.Provider value={{ exerciseData, setExerciseData }}>
        {children}
      </ExerciseContext.Provider>
    </>
  )
}

export const useExerciseContext = (): ExerciseContextTyping => {
  const context = useContext(ExerciseContext)
  if (!context) {
    throw new Error(
      "ExerciseContext must be used within the ExerciseContextProvider"
    )
  }
  return context
}
