import React, { createContext, useContext, useState } from "react"
import { CurrentWorkoutIdAction, CurrentWorkoutIdType } from "../@types/context"
export type CurrentWorkoutIdContextType = CurrentWorkoutIdType &
  CurrentWorkoutIdAction

type CurrentWorkoutContextProviderProps = {
  children: React.ReactNode
}

const CurrentWorkoutIdContext = createContext<
  CurrentWorkoutIdContextType | undefined
>(undefined)

export const CurrentWorkoutIdContextProvider = ({
  children,
}: CurrentWorkoutContextProviderProps) => {
  const [currentWorkoutId, setCurrentWorkoutId] = useState<string>("")

  return (
    <>
      <CurrentWorkoutIdContext.Provider
        value={{ currentWorkoutId, setCurrentWorkoutId }}
      >
        {children}
      </CurrentWorkoutIdContext.Provider>
    </>
  )
}

export const useCurrentWorkoutIdContext = (): CurrentWorkoutIdContextType => {
  const context = useContext(CurrentWorkoutIdContext)
  if (!context) {
    throw new Error(
      "CurrentWorkoutId must be used within the CurrentPhasesIdContextProvider"
    )
  }
  return context
}
