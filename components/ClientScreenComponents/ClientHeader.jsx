import { View, Text } from "react-native"
import { useState } from "react"
import { Searchbar } from "react-native-paper"

const ClientHeader = () => {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <>
      <View className="flex-1 items-center m-4">
        <Text className="font-bold text-3xl">Clients</Text>
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
