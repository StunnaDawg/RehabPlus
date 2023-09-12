import { View, Text } from "react-native"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import {IconButton, Button, Card, Divider} from 'react-native-paper'

const ProtocolWidget = () => {
  const navigation = useNavigation()
  return (
    <>
      <Divider bold/>
      <View className="flex-1 justify-between m-4">
        <View className=" flex-1 flex-row justify-center">
          <Text className="text-3xl font-bold">My Protocols</Text>
          <Button
          icon='format-list-bulleted'
            onPress={() => navigation.navigate("Protocol")}
          >View All</Button>
        </View>

        <View className="flex-1 flex-row justify-between m-4">
          <View className="flex-row justify-between">
            <Card>
                <Card.Content>
            <Text variant='titleSmall'>Acl Phase 1
           </Text>
           <Button
            onPress={() => navigation.navigate("Protocol")}
          >Edit</Button>
          </Card.Content>
          </Card>
            </View>

            <View className="flex-row justify-between">
            <Card>
                <Card.Content>
            <Text variant='titleSmall'>Acl Phase 2
           </Text>
           <Button
            onPress={() => navigation.navigate("Protocol")}
          >Edit</Button>
          </Card.Content>
          </Card>
            </View>

            <View className="flex-row justify-between">
            <Card>
                <Card.Content>
            <Text variant='titleSmall'>Acl Phase 3
           </Text>
           <Button
            onPress={() => navigation.navigate("Protocol")}
          >Edit</Button>
          </Card.Content>
          </Card>
            
          </View>
        </View>
      </View>
      <Divider bold/>
    </>
  )
}

export default ProtocolWidget
