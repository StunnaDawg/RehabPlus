import { ScrollView } from "react-native"
import { useIsFocused } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { db } from "../../firebase"
import {collection } from "firebase/firestore"
import getFireStoreData from "../../functions/getFireStoreData"
import ProtocolEditScreenWidget from "./components/ProtocolScreenWidget"

const ChangeClientProtocolScreen = () => {
  const [protocolList, setProtocolList] = useState([])
  const protocolsCollectionRef = collection(db, "protocols")
  const isFocused = useIsFocused()

  useEffect(() => {
    getFireStoreData(setProtocolList, protocolsCollectionRef)
  }, [isFocused])
  return (
    <>
      <ScrollView>
        {protocolList.map((protocol) => (
          <ProtocolEditScreenWidget
          key={protocol.id}
            weeks={protocol.weeks}
            protocolTitle={protocol.title}
            outline={protocol.description}
            id={protocol.id}
          />
        ))}
      </ScrollView>
    </>
  )
}

export default ChangeClientProtocolScreen
