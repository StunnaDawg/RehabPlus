import React, { createContext, useContext, useState } from "react"
import {
  SingleEditProtocolAction,
  SingleEditProtocolType,
} from "../@types/context"
import { Protocol } from "../@types/firestore"

export type SingleEditProtocolContextType = SingleEditProtocolType &
  SingleEditProtocolAction

type SingleEditProtocolContextProviderProps = {
  children: React.ReactNode
}

const SingleEditProtocolContext = createContext<
  SingleEditProtocolContextType | undefined
>(undefined)

export const SingleEditProtocolContextProvider = ({
  children,
}: SingleEditProtocolContextProviderProps) => {
  const [protocolEditData, setProtocolEditData] = useState<Protocol[]>([])

  return (
    <>
      <SingleEditProtocolContext.Provider
        value={{ protocolEditData, setProtocolEditData }}
      >
        {children}
      </SingleEditProtocolContext.Provider>
    </>
  )
}

export const useSingleEditProtocolContext =
  (): SingleEditProtocolContextType => {
    const context = useContext(SingleEditProtocolContext)
    if (!context) {
      throw new Error(
        "SingleEditProtocol must be used within the SingleEditProtocolContextProvider"
      )
    }
    return context
  }
