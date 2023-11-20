// // Create a context with default values (these can be anything).
// const EditProtocolContext = createContext({
//   protocol: null,
//   setCurrentProtocol: () => {}
// });
// export const EditProtocolProvider = ({ children }) => {
//   const [newClientProtocol, setClientProtocol] = useState(null);


import React, { createContext, useContext, useState } from "react"
import { AddClientProtocolDataType, AddClientProtocolDataAction } from "../@types/context"

export type AddClientProtocolContextType = AddClientProtocolDataType & AddClientProtocolDataAction

type AddClientProtocolContextProviderProps = {
  children: React.ReactNode
}

const AddClientProtocolContext = createContext<
AddClientProtocolContextType | undefined
>(undefined)

export const AddClientProtocolContextProvider = ({
  children,
}: AddClientProtocolContextProviderProps) => {
  const [newClientProtocol, setClientProtocol] = useState<string>('')

  return (
    <>
      <AddClientProtocolContext.Provider
        value={{ newClientProtocol, setClientProtocol }}
      >
        {children}
      </AddClientProtocolContext.Provider>
    </>
  )
}

export const useAddClientProtocolContext = (): AddClientProtocolContextType => {
  const context = useContext(AddClientProtocolContext)
  if (!context) {
    throw new Error(
      "AddClientProtocol must be used within the AddClientProtocolContextProvider"
    )
  }
  return context
}