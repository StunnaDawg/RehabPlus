import { View, Text } from "react-native"
import { useState } from "react"
import { Searchbar, IconButton } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"

const ProtocolScreenHeader = () => {
  const [searchQuery, setSearchQuery] = useState("")
const navigation = useNavigation()
  return (
    <>
    <View className="flex-1 flex-row m-4 justify-between items-center">
      <Text className="font-bold text-3xl">My Protocols</Text>
      <IconButton onPress={() => navigation.navigate("NewProtocol")} icon='plus'></IconButton>
      </View>
      <View>
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
