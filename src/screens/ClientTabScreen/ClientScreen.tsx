import { ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import ClientTable from "./components/ClientTable"
import ClientHeader from "./components/ClientHeader"
import getClientFireStoreData from "../../functions/getClientFireStoreData"
import { Client } from "../../@types/firestore"
import { DocumentData, collection } from "firebase/firestore"
import getDocumentRefData from "../../functions/getDocumentRefData"
import { db } from "../../firebase"
import { useIsFocused } from "@react-navigation/native"

export type ClientPlusProtocolType = {
  id: string
  email: string
  injuryDescription: string
  name: string
  protocol: DocumentData | undefined
  status: boolean
  userId: string
}

const ClientScreen = () => {
  const [clientList, setClientList] = useState<Client[]>([])
  const [clientPlusProtocol, setClientsPlusProtocol] = useState<
    ClientPlusProtocolType[]
  >([])
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
    setRefreshPlease(true)
  }, [clientPlusProtocol])

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
