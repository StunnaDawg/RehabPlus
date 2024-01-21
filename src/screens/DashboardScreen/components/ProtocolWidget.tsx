import { View, Text, Image } from "react-native"
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
          <Text className="text-3xl pb-2 font-bold">My Protocols</Text>
          <Button
            icon="format-list-bulleted"
            onPress={() => navigation.navigate("Protocol")}
          >
            View All
          </Button>
        </View>

        <View className="flex flex-col">
          {protocolWidgetList?.slice(0, 3).map((protocol) => (
            <View
              key={protocol.id}
              className="flex flex-row justify-around items-center bg-slate-300 p-1 border rounded"
            >
              {protocol.imageUri ? (
                <Image
                  source={{ uri: protocol.imageUri }}
                  style={{ width: 100, height: 100 }}
                />
              ) : (
                <Image
                  source={{ uri: protocol.imageUri }}
                  style={{ width: 100, height: 100 }}
                />
              )}
              <View className="flex flex-col">
                <Text className="text-lg font-bold">{protocol.title}</Text>
                <Button
                  textColor="black"
                  onPress={() => navigation.navigate("Protocol")}
                >
                  Edit
                </Button>
              </View>
            </View>
          ))}
        </View>
      </View>
      <Divider bold />
    </>
  )
}

export default ProtocolWidget
