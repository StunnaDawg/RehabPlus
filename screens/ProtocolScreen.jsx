import { ScrollView } from "react-native"
import { useIsFocused } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import ProtocolScreenWidget from "../components/ProtocolScreenComponents/ProtocolScreenWidget"
import ProtocolScreenHeader from "../components/ProtocolScreenComponents/ProtocolScreenHeader"
import { db } from "../firebase"
import { getDocs, collection } from "firebase/firestore"
import getFireStoreData from "../functions/getProtocols"

const ProtocolScreen = () => {
  const [protocolList, setProtocolList] = useState([])
  const protocolsCollectionRef = collection(db, "protocols")
  const isFocused = useIsFocused()

  useEffect(() => {
    getFireStoreData(setProtocolList, protocolsCollectionRef)
  }, [isFocused])
  return (
    <>
      <ScrollView>
        <ProtocolScreenHeader />
        {protocolList.map((protocol) => (
          <ProtocolScreenWidget
          key={protocol.id}
            weeks={protocol.weeks}
            protocolTitle={protocol.title}
            outline={protocol.description}
          />
        ))}
      </ScrollView>
    </>
  )
}

export default ProtocolScreen
