import { View, Text, Image } from "react-native"
import { Card, Button } from "react-native-paper"
import theImage from "../../assets/ACL-Repair-Surgery.jpg"
import React, { createContext, useContext, useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import GetSingleDoc from "../../functions/getSingleDoc"
import { collection } from "firebase/firestore"
import { db } from "../../firebase"
import { useSingleProtocolContext } from "../../protocolContext"
import { FIREBASE_AUTH } from "../../firebase"

const ProtocolScreenWidget = ({ protocolTitle, weeks, outline, id, userId }) => {
  const [protocolEditData, setProtocolEditData] = useSingleProtocolContext()
  const protocolsCollectionRef = collection(db, "protocols")
  const navigation = useNavigation()

  return (
      <View>
        <Card className="m-3">
          <Card.Content>
            <View className="justify-center items-center">
              <Text variant="titleLarge" className="font-bold text-2xl">
                {" "}
                {protocolTitle}{" "}
                {userId == FIREBASE_AUTH?.currentUser?.uid ? <Button
                  icon="pencil"
                  onPress={async () => {
                    await GetSingleDoc(
                      setProtocolEditData,
                      protocolsCollectionRef,
                      id
                    )
                    navigation.navigate("EditProtocol")
                  }}
                >
                  Edit
                </Button>: <Button>Copy Protocol</Button>}
              </Text>

              <Button icon="account">Assign to Client</Button>
            </View>
            <View className="flex-row">
              <Image source={theImage} style={{ width: 100, height: 100 }} />
              <View className="flex-1 flex-row justify-between">
                <View className="flex-col">
                  <Text className="m-2 font-bold">Weeks: {weeks}</Text>
                  <Text className="m-2 font-bold">Description: {outline}</Text>
                  {userId !== FIREBASE_AUTH?.currentUser?.uid ? <Text className="m-2 font-bold">Created by: {userId}</Text> : null}
                  <Card className="m-2">
                  </Card>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>
  )
}

export default ProtocolScreenWidget
