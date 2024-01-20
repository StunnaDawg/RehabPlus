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
import "../../../assets/R.png"

const ProtocolScreenWidget = ({
  title: protocolTitle,
  weeks,
  description: outline,
  id,
  userId,
  imageUri,
}: Protocol) => {
  const { setProtocolEditData } = useSingleEditProtocolContext()
  const protocolsCollectionRef = collection(db, "protocols")
  const navigation = useNavigation<NavigationType>()

  return (
    <View className=" flex flex-row justify-around items-center m-3 bg-slate-300 border rounded p-3">
      <View className="flex flex-col">
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={{ width: 100, height: 100 }}
          />
        ) : (
          <Image
            source={{ uri: imageUri }}
            style={{ width: 100, height: 100 }}
          />
        )}
      </View>
      <View className="flex flex-col items-center">
        <Text className="font-bold text-xl"> {protocolTitle} </Text>
        <View className="flex flex-row">
          <Button
            textColor="#0277BD"
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
          <Button
            textColor="black"
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
        </View>
        <View className="flex flex-col">
          <Button textColor="black" icon="account">
            Assign to Client
          </Button>
        </View>
      </View>
    </View>
  )
}

export default ProtocolScreenWidget
