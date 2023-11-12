import React, { createContext, useContext, useState } from "react"
import {
  EditClientDataType, EditClientAction
} from "../@types/context"

export type EditClientContextType = EditClientDataType & EditClientAction

type EditClientContextProviderProps = {
  children: React.ReactNode
}

const EditClientContext = createContext<
EditClientContextType | undefined
>(undefined)

export const EditClientContextProvider = ({
  children,
}: EditClientContextProviderProps) => {
  const [clientEditData, setClientEditData] = useState<string[]>([])

  return (
    <>
      <EditClientContext.Provider
        value={{ clientEditData, setClientEditData}}
      >
        {children}
      </EditClientContext.Provider>
    </>
  )
}

export const useEditClientContext = (): EditClientContextType => {
  const context = useContext(EditClientContext)
  if (!context) {
    throw new Error(
      "EditClientContext must be used within the EditClientContextProvider"
    )
  }
  return context
}
