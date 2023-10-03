import { View, Text, Image } from "react-native"
import { Card, Button } from "react-native-paper"
import theImage from "../../../assets/ACL-Repair-Surgery.jpg"
import React, { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import GetSingleDoc from "../../../functions/getSingleDoc"
import { collection } from "firebase/firestore"
import { db } from "../../../firebase"
import { useSingleProtocolContext } from "../../../protocolContext"

const ProtocolEditScreenWidget = ({ protocolTitle, weeks, outline, id }) => {
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
            </Text>
            <Button
              onPress={() => {
                route.params?.updateProtocol("NewProtocolValueFromSecondScreen")
                navigation.goBack()
              }}
              icon="account"
            >
              Assign to Client
            </Button>
          </View>
          <View className="flex-row">
            <Image source={theImage} style={{ width: 100, height: 100 }} />
            <View className="flex-1 flex-row justify-between">
              <View className="flex-col">
                <Text className="m-2 font-bold">Weeks: {weeks}</Text>
                <Text className="m-2 font-bold">Description: {outline}</Text>
                <Card className="m-2">
                  <Card.Content></Card.Content>
                </Card>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  )
}

export default ProtocolEditScreenWidget
