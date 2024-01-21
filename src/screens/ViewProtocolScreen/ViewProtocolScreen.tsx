import { View, Text, ScrollView, Image } from "react-native"
import { useSingleEditProtocolContext } from "../../context/protocolContext"
import { Button, IconButton } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"

const ViewProtocolScreen = () => {
  const { protocolEditData } = useSingleEditProtocolContext()
  const navigation = useNavigation<NavigationType>()

  return (
    <>
      <ScrollView className="bg-slate-500">
        <View className="mb-20">
          <View className="flex flex-row justify-center">
            {protocolEditData.imageUri ? (
              <Image
                source={{ uri: protocolEditData.imageUri }}
                style={{ width: 200, height: 200 }}
              />
            ) : (
              <Image
                source={{ uri: protocolEditData.imageUri }}
                style={{ width: 200, height: 200 }}
              />
            )}
          </View>
        </View>
        <View className="mb-8">
          <View className="mx-2 mb-5">
            <Text className="text-4xl font-bold">{protocolEditData.title}</Text>
          </View>
          <View className="flex flex-row justify-start">
            <Text className="font-semibold mx-4">Phases:</Text>
            <Text className="font-semibold">
              Weeks: {protocolEditData?.weeks}
            </Text>
          </View>
        </View>

        <View className="mb-8">
          <View className="mx-2">
            <Text className="text-2xl font-semibold">Protocol overview:</Text>
            <Text>{protocolEditData.description}</Text>
          </View>
        </View>

        <View className="mx-2">
          <Text className="text-2xl font-semibold">About the Creator:</Text>
          <Text>blah blah creator is a blah blah at blah blah</Text>
        </View>
      </ScrollView>

      <View className="flex flex-1 bg-slate-500">
        <View className="mb-1 mx-6">
          <Button
            textColor="black"
            onPress={() => navigation.navigate("ViewPhasesScreen")}
            mode="contained"
            className="p-1 bg-slate-300"
          >
            <Text className="text-lg">View Protocol</Text>
          </Button>
        </View>
        <View className="mb-1 mx-10">
          <Button mode="outlined" className="p-1" textColor="black">
            <Text className="text-lg">Assign Protocol</Text>
          </Button>
        </View>
      </View>
    </>
  )
}

export default ViewProtocolScreen
