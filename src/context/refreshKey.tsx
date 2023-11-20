import React, { createContext, useContext, useState } from "react"
import { RefreshKey, RefreshKeyActions } from "../@types/context"

export type RefreshKeyContextType = RefreshKey & RefreshKeyActions

type RefreshContextProviderProps = {
  children: React.ReactNode
}

const RefreshKeyContext = createContext<RefreshKeyContextType | undefined>(
  undefined
)

export const RefreshKeyContextProvider = ({
  children,
}: RefreshContextProviderProps) => {
  const [refreshKey, setRefreshKey] = useState<boolean>(false)

  return (
    <>
      <RefreshKeyContext.Provider value={{ refreshKey, setRefreshKey }}>
        {children}
      </RefreshKeyContext.Provider>
    </>
  )
}

export const useRefreshKeyContext = (): RefreshKeyContextType => {
  const context = useContext(RefreshKeyContext)
  if (!context) {
    throw new Error(
      "RefreshKey must be used within the RefreshKeyContextProvider"
    )
  }
  return context
}
