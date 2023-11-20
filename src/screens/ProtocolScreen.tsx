import { ScrollView, Text, View } from "react-native"
import { useIsFocused } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import ProtocolScreenWidget from "../components/ProtocolScreenComponents/ProtocolScreenWidget"
import ProtocolScreenHeader from "../components/ProtocolScreenComponents/ProtocolScreenHeader"
import { FIREBASE_AUTH, db } from "../firebase"
import { collection } from "firebase/firestore"
import getFireStoreData from "../functions/getFireStoreData"
import { Switch } from "react-native-paper"
import { Protocol } from "../@types/firestore"

const ProtocolScreen = () => {
  const [protocolList, setProtocolList] = useState<Protocol[] | undefined>([])
  const [listPublic, setListPublic] = useState(false)
  const protocolsCollectionRef = collection(db, "protocols")
  const isFocused = useIsFocused()

  const onToggleSwitch = () => setListPublic(!listPublic)


  useEffect(() => {
    getFireStoreData(setProtocolList, protocolsCollectionRef)
  }, [isFocused])
  return (
    <>
      <ScrollView>
        <ProtocolScreenHeader />
        <View className="flex-1 flex-row-reverse items-center justify-center">
          <Text>Show Public Protocols</Text>
          <Switch value={listPublic} onValueChange={onToggleSwitch} />
        </View>
        {
    listPublic 
        ? protocolList?.map((protocol) => (
            <ProtocolScreenWidget
                key={protocol.id}
                weeks={protocol.weeks}
                title={protocol.title}
                description={protocol.description}
                id={protocol.id}
                userId={protocol.userId}
            />
          ))
        : protocolList?.map((protocol) => (
          protocol.userId == FIREBASE_AUTH?.currentUser?.uid ? 
            <ProtocolScreenWidget
                key={protocol.id}
                weeks={protocol.weeks}
                title={protocol.title}
                description={protocol.description}
                id={protocol.id}
                userId={protocol.userId}
            /> : null
          ))
}
      </ScrollView>
    </>
  )
}

export default ProtocolScreen
