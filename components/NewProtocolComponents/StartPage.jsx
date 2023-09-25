import { View, Text } from "react-native"
import { TextInput } from "react-native-paper"
import { useState } from "react"
import DropDownDays from "./components/DropDownDays"

const StartPage = () => {
  const [expanded, setExpanded] = useState(true)
  const [text, setTitleText] = useState("")
  const [outlineText, setOutlineText] = useState("")
  const [weeksText, setWeeksText] = useState("")
  const [daysPerWeek, setDaysPerWeek] = useState("1")
  return (
    <>
      <View className="mx-4 my-1">
        <Text>Protocol Title</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setTitleText(text)}
        ></TextInput>
      </View>

      <View className="mx-4 my-1">
        <Text>Outline</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setOutlineText(text)}
        ></TextInput>
      </View>

      <View className="mx-4 my-1">
        <Text>Weeks</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setWeeksText(text)}
        ></TextInput>
      </View>

      <DropDownDays setTheDays={setDaysPerWeek} chosenDays={daysPerWeek} />
    </>
  )
}

export default StartPage
