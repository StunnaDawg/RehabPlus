import { View, Text } from "react-native"
import { useState } from "react"
import { Searchbar } from "react-native-paper"

const ProtocolScreenHeader = () => {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <>
    <View className="flex-1 m-4 items-center">
      <Text className="font-bold text-3xl">My Protocols</Text>
      </View>
      <View className='flex-1'>
      <Searchbar
        placeholder="Search Protocols"
        onChangeText={(query) => {
          setSearchQuery(query)
        }}
        value={searchQuery}
      />
    </View>
    </>
  )
}

export default ProtocolScreenHeader
