import React, { createContext, useContext, useEffect, useState } from "react"
import { IsClientType, SetIsClient } from "../@types/context"
import { FIREBASE_AUTH, db } from "../firebase"
import { doc, getDoc } from "firebase/firestore"

export type IsClientTypeContextType = IsClientType & SetIsClient

type IsClientTypeContextProviderProps = {
  children: React.ReactNode
}

const IsClientTypeContext = createContext<IsClientTypeContextType | undefined>(
  undefined
)

export const IsClientTypeContextProvider = ({
  children,
}: IsClientTypeContextProviderProps) => {
  const [isClient, setIsClient] = useState<boolean>(false)

  return (
    <IsClientTypeContext.Provider value={{ isClient, setIsClient }}>
      {children}
    </IsClientTypeContext.Provider>
  )
}

export const useIsClient = (): IsClientTypeContextType => {
  const context = useContext(IsClientTypeContext)
  if (!context) {
    throw new Error("useUserAuth must be used within a UserAuthContextProvider")
  }
  return context
}
