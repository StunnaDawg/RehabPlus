import { View, Text } from "react-native"
import React, { useState } from "react"
import { Button, Searchbar, Title, ButtonProps } from "react-native-paper"

const Categories = [
  { id: 1, title: "Bicep" },
  { id: 2, title: "Quad" },
  { id: 3, title: "Plyometrics" },
]

const Database = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isPressed, setIsPressed] = useState(false)
  const [pressedButtonId, setPressedButtonId] = useState(null)

  return (
    <>
      <View className="flex-1 flex-row justify-center my-2">
        <Text className="text-xl font-semibold">Add Exercise</Text>
      </View>
      <View className="my-2 mx-5">
        <Searchbar
          placeholder="Search"
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
        />
      </View>

      <View className="flex-1 flex-row m-2">
        {Categories.map((category) => (
          <View key={category.id} className="m-2">
            <Button
              mode={pressedButtonId === category.id ? "contained" : "outlined"}
              
              onPress={() => {
                pressedButtonId === category.id
                  ? setPressedButtonId(null)
                  : setPressedButtonId(category.id)
              }}
            >
              {category.title}
            </Button>
          </View>
        ))}
      </View>
    </>
  )
}

export default Database
