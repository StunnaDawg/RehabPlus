import React, { createContext, useContext, useState } from "react"
import { EditWorkoutType, EditWorkoutAction } from "../@types/context"
import { Workout } from "../@types/firestore"
export type EditWorkoutContextType = EditWorkoutType & EditWorkoutAction

type EditWorkoutContextProviderProps = {
  children: React.ReactNode
}

const EditWorkoutContext = createContext<
EditWorkoutContextType | undefined
>(undefined)

export const EditWorkoutContextProvider = ({
  children,
}: EditWorkoutContextProviderProps) => {
  const [editWorkoutData, setEditWorkoutData] = useState<Workout[]>([])

  return (
    <>
      <EditWorkoutContext.Provider
        value={{ editWorkoutData, setEditWorkoutData }}
      >
        {children}
      </EditWorkoutContext.Provider>
    </>
  )
}

export const useEditWorkoutContext = (): EditWorkoutContextType => {
  const context = useContext(EditWorkoutContext)
  if (!context) {
    throw new Error(
      "EditWorkout must be used within the EditWorkoutContextProvider"
    )
  }
  return context
}