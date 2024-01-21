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
  imageUri?: string
  assigned: boolean
}

const ProtocolAddScreenWidget = ({
  protocolTitle,
  weeks,
  outline,
  id,
  imageUri,
  assigned,
}: ProtocolAddScreenWidgetProps) => {
  const { setClientProtocol } = useAddClientProtocolContext()
  const navigation = useNavigation()

  return (
    <View>
      <View className="flex flex-row justify-around items-center m-3 bg-slate-300 border rounded p-3">
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
        <View className="flex flex-col items-center">
          <Text className="font-bold text-2xl"> {protocolTitle} </Text>
          {!assigned ? (
            <Button
              onPress={async () => {
                setClientProtocol(id)
                navigation.goBack()
              }}
              icon="account"
            >
              Assign to Client
            </Button>
          ) : null}
        </View>
      </View>
    </View>
  )
}

export default ProtocolAddScreenWidget
