import { View, Text } from "react-native"
import { useState } from "react"
import { Searchbar, Button } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { addDoc, collection } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../firebase"
import { NavigationType } from "../../@types/navigation"

const ProtocolScreenHeader = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const navigation = useNavigation<NavigationType>()
  const protocolsCollectionRef = collection(db, "protocols")

  const onSubmitEmptyProtocol = async () => {
    try {
      const DocRef = await addDoc(protocolsCollectionRef, {
        title: "",
        description: "",
        userId: FIREBASE_AUTH?.currentUser?.uid,
      })
      const newProtocolId = DocRef.id

      console.log("New Protocol ID:", newProtocolId)
      
      return newProtocolId
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <>
      <View className="flex-1 flex-row m-4 justify-between items-center">
        <Text className="font-bold text-3xl">My Protocols</Text>
        <Button
          onPress={async () => {
            const newProtocolId = await onSubmitEmptyProtocol();
            navigation.navigate("NewProtocol", {protocolId: newProtocolId})
          }}
          icon="plus"
        >New Protocol</Button>
      </View>
      <View></View>
      <View className="flex-1">
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
