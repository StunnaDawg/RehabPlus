import React, { createContext, useContext, useState } from "react"
import {
  CurrentPhasesIdAction,
  CurrentPhasesIdType,
} from "../@types/context"
export type CurrentPhasesIdContextType = CurrentPhasesIdType &
  CurrentPhasesIdAction

type CurrentPhasesIdContextProviderProps = {
  children: React.ReactNode
}

const CurrentPhasesIdContext = createContext<
CurrentPhasesIdContextType | undefined
>(undefined)

export const CurrentPhasesIdContextProvider = ({
  children,
}: CurrentPhasesIdContextProviderProps) => {
  const [currentPhasesId, setCurrentPhasesId] = useState<string>('')

  return (
    <>
      <CurrentPhasesIdContext.Provider
        value={{ currentPhasesId, setCurrentPhasesId }}
      >
        {children}
      </CurrentPhasesIdContext.Provider>
    </>
  )
}

export const useCurrentPhasesIdContext = (): CurrentPhasesIdContextType => {
  const context = useContext(CurrentPhasesIdContext)
  if (!context) {
    throw new Error(
      "CurrentPhasesId must be used within the CurrentPhasesIdContextProvider"
    )
  }
  return context
}
