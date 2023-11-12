import React, { createContext, useContext, useState } from "react"
import {
  CurrentPhasesDataAction,
  CurrentPhasesDataType,
} from "../@types/context"

export type CurrentPhasesDataContextType = CurrentPhasesDataType &
  CurrentPhasesDataAction

type CurrentPhasesDataContextProviderProps = {
  children: React.ReactNode
}

const CurrentPhasesDataContext = createContext<
  CurrentPhasesDataContextType | undefined
>(undefined)

export const CurrentPhasesDataContextProvider = ({
  children,
}: CurrentPhasesDataContextProviderProps) => {
  const [currentPhasesData, setCurrentPhasesData] = useState<string[]>([])

  return (
    <>
      <CurrentPhasesDataContext.Provider
        value={{ currentPhasesData, setCurrentPhasesData }}
      >
        {children}
      </CurrentPhasesDataContext.Provider>
    </>
  )
}

export const useCurrentPhasesDataContext = (): CurrentPhasesDataContextType => {
  const context = useContext(CurrentPhasesDataContext)
  if (!context) {
    throw new Error(
      "CurrentPhasesData must be used within the CurrentPhasesDataContextProvider"
    )
  }
  return context
}
