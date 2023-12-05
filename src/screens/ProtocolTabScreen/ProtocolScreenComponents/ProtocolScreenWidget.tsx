import { View, Text, Image } from "react-native"
import { Card, Button } from "react-native-paper"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import GetSingleDoc from "../../../functions/getSingleDoc"
import { collection } from "firebase/firestore"
import { db } from "../../../firebase"
import { useSingleEditProtocolContext } from "../../../context/protocolContext"
import { FIREBASE_AUTH } from "../../../firebase"
import { NavigationType } from "../../../@types/navigation"
import { Protocol } from "../../../@types/firestore"

const ProtocolScreenWidget = ({
  title: protocolTitle,
  weeks,
  description: outline,
  id,
  userId,
}: Protocol) => {
  const { setProtocolEditData } = useSingleEditProtocolContext()
  const protocolsCollectionRef = collection(db, "protocols")
  const navigation = useNavigation<NavigationType>()

  return (
    <View>
      <Card className="m-3">
        <Card.Content>
          <View className="justify-center items-center">
            <Text className="font-bold text-2xl">
              {" "}
              {protocolTitle}{" "}
              <Button
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
              </Button>
            </Text>
            <View className="flex-row">
              <Button icon="account">Assign to Client</Button>
              <Button
                icon="eye"
                onPress={async () => {
                  {
                    await GetSingleDoc(
                      setProtocolEditData,
                      protocolsCollectionRef,
                      id
                    )

                    navigation.navigate("ViewProtocolScreen")
                  }
                }}
              >
                {" "}
                View{" "}
              </Button>
            </View>
          </View>
          <View className="flex-row">
            {/* <Image source={theImage} style={{ width: 100, height: 100 }} /> */}
            <View className="flex-1 flex-row justify-between">
              <View className="flex-col">
                <Text className="m-2 font-bold">Weeks: {weeks}</Text>
                <Text className="m-2 font-bold">Description: {outline}</Text>
                {userId !== FIREBASE_AUTH?.currentUser?.uid ? (
                  <Text className="m-2 font-bold">Created by: {userId}</Text>
                ) : null}
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  )
}

export default ProtocolScreenWidget
