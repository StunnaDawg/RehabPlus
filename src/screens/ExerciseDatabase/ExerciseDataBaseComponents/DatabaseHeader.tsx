import { View, Text, FlatList } from "react-native"
import React, { Dispatch, SetStateAction, useState } from "react"
import { Button, Searchbar, Title, ButtonProps } from "react-native-paper"

type DatabaseHeadBaseProps = {
  setSearchTriggerProp: Dispatch<SetStateAction<boolean>>
  setShowCategories: Dispatch<SetStateAction<boolean>>
}

const DatabaseHeader = ({
  setSearchTriggerProp,
  setShowCategories,
}: DatabaseHeadBaseProps) => {
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
          onChangeText={(query) => {
            setSearchQuery(query)
            setSearchTriggerProp(true)
          }}
          value={searchQuery}
        />
        <Button onPress={() => setShowCategories(true)}>All</Button>
      </View>
    </>
  )
}

export default DatabaseHeader
