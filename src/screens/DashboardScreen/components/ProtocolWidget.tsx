import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { IconButton, Button, Card, Divider } from "react-native-paper"
import getFireStoreData from "../../../functions/getFireStoreData"
import { collection } from "firebase/firestore"
import { db } from "../../../firebase"
import { TabNavigationType } from "../../../@types/navigation"
import { Protocol } from "../../../@types/firestore"

const ProtocolWidget = () => {
  const [protocolWidgetList, setProtocolWidgetList] = useState<Protocol[]>()
  const protocolsCollectionRef = collection(db, "protocols")
  const navigation = useNavigation<TabNavigationType>()
  const isFocused = useIsFocused()

  useEffect(() => {
    getFireStoreData(setProtocolWidgetList, protocolsCollectionRef)
    console.log("dashboard")
  }, [isFocused])
  return (
    <>
      <Divider bold />
      <View className="flex-1 justify-between m-4">
        <View className=" flex-1 flex-row justify-center">
          <Text className="text-3xl font-bold">My Protocols</Text>
          <Button
            icon="format-list-bulleted"
            onPress={() => navigation.navigate("Protocol")}
          >
            View All
          </Button>
        </View>

        <View className="flex-1 flex-row justify-between m-4">
          {protocolWidgetList?.slice(0, 3).map((protocol) => (
            <View key={protocol.id} className="flex-row justify-between">
              <Card>
                <Card.Content>
                  <Text>{protocol.title}</Text>
                  <Button onPress={() => navigation.navigate("Protocol")}>
                    Edit
                  </Button>
                </Card.Content>
              </Card>
            </View>
          ))}
        </View>
      </View>
      <Divider bold />
    </>
  )
}

export default ProtocolWidget
