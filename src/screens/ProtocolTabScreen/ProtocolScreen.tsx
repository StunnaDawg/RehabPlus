import { ScrollView, Text, View } from "react-native"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import ProtocolScreenWidget from "./ProtocolScreenComponents/ProtocolScreenWidget"
import ProtocolScreenHeader from "./ProtocolScreenComponents/ProtocolScreenHeader"
import { FIREBASE_AUTH, db } from "../../firebase"
import { collection } from "firebase/firestore"
import getFireStoreData from "../../functions/getFireStoreData"
import { Button, Switch } from "react-native-paper"
import { Protocol } from "../../@types/firestore"
import { NavigationType } from "../../@types/navigation"

const ProtocolScreen = () => {
  const [protocolList, setProtocolList] = useState<Protocol[] | undefined>([])
  const [listPublic, setListPublic] = useState(false)
  const protocolsCollectionRef = collection(db, "protocols")
  const isFocused = useIsFocused()
  const navigation = useNavigation<NavigationType>()

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
          <Button onPress={() => navigation.navigate("CreateExercise")}>
            Create New Exercise
          </Button>
        </View>
        {listPublic
          ? protocolList?.map((protocol) => (
              <ProtocolScreenWidget
                key={protocol.id}
                weeks={protocol.weeks}
                title={protocol.title}
                description={protocol.description}
                id={protocol.id}
                userId={protocol.userId}
                imageUri={protocol.imageUri}
              />
            ))
          : protocolList?.map((protocol) =>
              protocol.userId == FIREBASE_AUTH?.currentUser?.uid ? (
                <ProtocolScreenWidget
                  key={protocol.id}
                  weeks={protocol.weeks}
                  title={protocol.title}
                  description={protocol.description}
                  id={protocol.id}
                  userId={protocol.userId}
                  imageUri={protocol.imageUri}
                />
              ) : null
            )}
      </ScrollView>
    </>
  )
}

export default ProtocolScreen
