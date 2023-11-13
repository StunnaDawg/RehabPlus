import React, { createContext, useContext, useState } from "react"
import { NewProtocolDataAction, NewProtocolDataType } from "../@types/context"
import { Protocol } from "../@types/firestore"
export type NewProtocolDataContextType = NewProtocolDataType & NewProtocolDataAction

type NewProtocolDataContextProviderProps = {
  children: React.ReactNode
}

const NewProtocolDataContext = createContext<
NewProtocolDataContextType | undefined
>(undefined)

export const NewProtocolDataContextProvider = ({
  children,
}: NewProtocolDataContextProviderProps) => {
  const [newProtocolData, setNewProtocolData] = useState<Protocol>({} as Protocol)

  return (
    <>
      <NewProtocolDataContext.Provider
        value={{ newProtocolData, setNewProtocolData }}
      >
        {children}
      </NewProtocolDataContext.Provider>
    </>
  )
}

export const useNewProtocolDataContext = (): NewProtocolDataContextType => {
  const context = useContext(NewProtocolDataContext)
  if (!context) {
    throw new Error(
      "NewProtocolDatamust be used within the NewProtocolDataContextProvider"
    )
  }
  return context
}
