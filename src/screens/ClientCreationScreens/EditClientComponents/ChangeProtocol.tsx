import { ScrollView } from "react-native"
import { useIsFocused } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { db } from "../../../firebase"
import { collection } from "firebase/firestore"
import getFireStoreData from "../../../functions/getFireStoreData"
import ProtocolEditScreenWidget from "./components/ProtocolScreenWidget"
import { Protocol } from "../../../@types/firestore"

const ChangeClientProtocolScreen = () => {
  const [protocolList, setProtocolList] = useState<Protocol[]>()
  const protocolsCollectionRef = collection(db, "protocols")
  const isFocused = useIsFocused()

  useEffect(() => {
    getFireStoreData(setProtocolList, protocolsCollectionRef)
    console.log("edit client protocol:", [protocolList])
  }, [isFocused])
  return (
    <>
      <ScrollView className="bg-slate-500">
        {protocolList?.map((protocol) => (
          <ProtocolEditScreenWidget
            key={protocol.id}
            protocolTitle={protocol.title}
            id={protocol.id}
            imageUri={protocol.imageUri}
            assigned={true}
          />
        ))}
      </ScrollView>
    </>
  )
}

export default ChangeClientProtocolScreen
