import { ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import ClientTable from "./components/ClientTable"
import ClientHeader from "./components/ClientHeader"
import getClientFireStoreData from "../../functions/getClientFireStoreData"
import { Client, Protocol } from "../../@types/firestore"
import { DocumentData, collection, doc } from "firebase/firestore"
import getDocumentRefData from "../../functions/getDocumentRefData"
import { db } from "../../firebase"
import { useIsFocused } from "@react-navigation/native"
import getFireStoreData from "../../functions/getFireStoreData"
import GetSingleDoc from "../../functions/getSingleDoc"
import { useAddClientProtocolContext } from "../../context/EditProtocolContext"

export type ClientPlusProtocolType = {
  id: string
  email: string
  injuryDescription: string
  name: string
  protocol: string
  protocolTitle: string
  status: boolean
  userId: string
}

const ClientScreen = () => {
  const [clientList, setClientList] = useState<Client[]>([])
  const [clientPlusProtocol, setClientsPlusProtocol] = useState<
    ClientPlusProtocolType[]
  >([])
  const { setClientProtocol } = useAddClientProtocolContext()
  const [protocolTitle, setProtocolTitle] = useState<Protocol>({} as Protocol)
  const [refreshPlease, setRefreshPlease] = useState(false)
  const clientsCollectionRef = collection(db, "clients")
  const isFocused = useIsFocused()

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        console.log("doing")
        await getClientFireStoreData(setClientList, clientsCollectionRef)
      } catch (err) {
        console.error(err)
      }
    }

    fetchClientData()
  }, [isFocused])

  useEffect(() => {
    const addProtocolTitle = async () => {
      try {
        const protocolCollectionRef = collection(db, "protocols")
        clientList.map((client) => {
          GetSingleDoc(setProtocolTitle, protocolCollectionRef, client.id)
        })
      } catch (err) {
        console.error(err)
      }
    }
    addProtocolTitle()
  }, [clientList])

  useEffect(() => {
    setClientProtocol("")
  }, [])

  return (
    <ScrollView>
      <ClientHeader />
      <ClientTable
        otherClientList={clientList}
        clientList={clientPlusProtocol}
        clientsCollectionRef={clientsCollectionRef}
      />
    </ScrollView>
  )
}

export default ClientScreen
