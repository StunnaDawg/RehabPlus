import { View, Text } from "react-native"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import { Button, Card, Divider } from "react-native-paper"
import { NavigationType } from "../@types/navigation"

const InboxWidget = () => {
  const navigation = useNavigation<NavigationType>()
  return (
    <>
      <Divider bold />
      <View className="flex-1 justify-between m-4 mb-20">
        <View className="flex-1 items-center flex-row justify-center mt-2">
          <Text className="text-3xl font-extrabold text-center">Inbox</Text>
          <Button
            icon="inbox-full"
            onPress={() => navigation.navigate("Inbox")}
          >
            View
          </Button>
        </View>
        <View className="flex-1 items-center flex-row justify-center mt-20">
          <Text className="text-xl font-extrabold">Coming soon...</Text>
        </View>
        {/* <View className=" flex-1 flex-row justify-center">
        <Text className="text-3xl font-bold text-center">Inbox</Text>
        <Button icon='inbox-full' onPress={() => navigation.navigate("Inbox")}>View</Button>
      </View>

      <View>
        <Text className="text-lg font-bold mb-2">Recent Messages</Text>
        <View>
          
          <Card>
            <Card.Content>
            <Button icon="account-circle"> Harold</Button>
          <Text variant="titleSmall" className="text-s"><Button icon="clock">2 Hours ago</Button></Text>
          
          <Card>
            <Card.Content>
          <Text variant="bodySmall" className="text-s">Lorem ipsum dolor sit amet, consectetur adipiscing elit....</Text>
          </Card.Content>
          </Card>
            </Card.Content>
          </Card>
          <Button onPress={() => navigation.navigate("Inbox")}>View</Button>
        </View>
        <View className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700"></View>
        <View>
        
        <Card>
        <Card.Content>
            <Button icon="account-circle"> Kerry </Button>
            <Text variant="titleSmall" className="text-s"><Button icon="clock"> 3 Hours ago</Button></Text>
            <Card>
            <Card.Content>
          <Text variant="bodySmall" className="text-s">Hello Bro</Text>
          </Card.Content>
          </Card>
            </Card.Content>
            </Card>
          <Button onPress={() => navigation.navigate("Inbox")}>View</Button>
        </View>
      </View> */}
      </View>
      <Divider bold />
    </>
  )
}

export default InboxWidget
