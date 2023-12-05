import { View, Text, FlatList } from "react-native"
import React, { useState } from "react"
import { Button, Searchbar, Title, ButtonProps } from "react-native-paper"

const Categories = [
  { id: 1, title: "Bicep" },
  { id: 2, title: "Quad" },
  { id: 3, title: "Plyometrics" },
]

const DatabaseHeader = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isPressed, setIsPressed] = useState(false)
  const [pressedButtonId, setPressedButtonId] = useState(null)

  return (
    <>
      <View className=" items-center my-4">
        <Text className="text-xl font-semibold">Add Exercise</Text>
      </View>
      <View className="my-2 mx-5">
        <Searchbar
          placeholder="Search"
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
        />
      </View>
    </>
  )
}

export default DatabaseHeader
