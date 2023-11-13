import React, { createContext, useContext, useState } from "react"
import { NewWorkoutDataType, NewWorkoutAction } from "../@types/context"
import { Workout } from "../@types/firestore"

export type NewWorkoutContextType = NewWorkoutDataType & NewWorkoutAction

type NewWorkoutContextProviderProps = {
  children: React.ReactNode
}

const NewWorkoutContext = createContext<NewWorkoutContextType | undefined>(
  undefined
)

export const NewWorkoutContextProvider = ({
  children,
}: NewWorkoutContextProviderProps) => {
  const [newWorkoutData, setNewWorkoutData] = useState<Workout[]>([])

  return (
    <>
      <NewWorkoutContext.Provider value={{ newWorkoutData, setNewWorkoutData }}>
        {children}
      </NewWorkoutContext.Provider>
    </>
  )
}

export const useNewWorkoutContext = (): NewWorkoutContextType => {
  const context = useContext(NewWorkoutContext)
  if (!context) {
    throw new Error(
      "NewWorkoutContext must be used within the NewWorkoutContextProvider"
    )
  }
  return context
}
