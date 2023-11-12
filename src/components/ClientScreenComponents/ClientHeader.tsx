import { View, Text } from "react-native"
import { useState } from "react"
import { Searchbar, IconButton } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"

const ClientHeader = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const navigation = useNavigation()

  return (
    <>
      <View className="flex-1 flex-row items-center justify-between m-4">
        <Text className="font-bold text-3xl">Clients</Text>
        <IconButton onPress={() => navigation.navigate("NewClient")} icon="plus"></IconButton>
      </View>
      <View className="flex-1 mx-3">
        <Searchbar
          className="flex-1"
          placeholder="Search Clients"
          onChangeText={(query) => {
            setSearchQuery(query)
          }}
          value={searchQuery}
        />
      </View>
    </>
  )
}

export default ClientHeader
