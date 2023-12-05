import { View, Text, Image } from "react-native"
import { Card, Button } from "react-native-paper"
import React, { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { useAddClientProtocolContext } from "../../../../context/EditProtocolContext"

type ProtocolAddScreenWidgetProps = {
  protocolTitle: string
  weeks?: string
  outline?: string
  id: string
}

const ProtocolAddScreenWidget = ({
  protocolTitle,
  weeks,
  outline,
  id,
}: ProtocolAddScreenWidgetProps) => {
  const { setClientProtocol } = useAddClientProtocolContext()
  const navigation = useNavigation()

  return (
    <View>
      <Card className="m-3">
        <Card.Content>
          <View className="justify-center items-center">
            <Text className="font-bold text-2xl"> {protocolTitle} </Text>
            <Button
              onPress={async () => {
                await setClientProtocol(id)
                navigation.goBack()
              }}
              icon="account"
            >
              Assign to Client
            </Button>
          </View>
          <View className="flex-row">
            {/* <Image source={theImage} style={{ width: 100, height: 100 }} /> */}
            <View className="flex-1 flex-row justify-between">
              <View className="flex-col">
                <Text className="m-2 font-bold">Weeks: {weeks}</Text>
                <Text className="m-2 font-bold">Description: {outline}</Text>
                <Card className="m-2"></Card>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  )
}

export default ProtocolAddScreenWidget
