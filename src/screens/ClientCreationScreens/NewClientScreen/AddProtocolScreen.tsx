import { ScrollView } from "react-native"
import { useIsFocused } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { db } from "../../../firebase"
import { collection } from "firebase/firestore"
import getFireStoreData from "../../../functions/getFireStoreData"
import ProtocolAddScreenWidget from "./components/AddProtocolScreenWidget"
import { Protocol } from "../../../@types/firestore"

const AddClientProtocolScreen = () => {
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
          <ProtocolAddScreenWidget
            key={protocol.id}
            weeks={protocol.weeks}
            protocolTitle={protocol.title}
            outline={protocol.description}
            id={protocol.id}
            imageUri={protocol.imageUri}
            assigned={false}
          />
        ))}
      </ScrollView>
    </>
  )
}

export default AddClientProtocolScreen
