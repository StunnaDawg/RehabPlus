import { View, Text } from "react-native"
import { Switch, TextInput } from "react-native-paper"
import { useState } from "react"
import DropDownDays from "./components/DropDownDays"
import CreateButton from "./components/CreateButton"
import { db } from "../../firebase"
import { collection } from "firebase/firestore"

const StartPage = () => {
  const [expanded, setExpanded] = useState(true)
  const [titleText, setTitleText] = useState("")
  const [outlineText, setOutlineText] = useState("")
  const [weeksText, setWeeksText] = useState("")
  const [daysPerWeek, setDaysPerWeek] = useState("1")
  const [isPublic, setIsPublic] = useState(false)

  const onToggleSwitch = () => setIsPublic(!isPublic)
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
          keyboardType="numeric"
        ></TextInput>
      </View>

      {/* <DropDownDays setTheDays={setDaysPerWeek} chosenDays={daysPerWeek} /> */}
      <View className="mx-4 my-1">
        <Text>Days per Week</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setDaysPerWeek(text)}
          placeholderTextColor="black"
          keyboardType="numeric"
        ></TextInput>
      </View>
      <View className="flex-1 flex-row items-center justify-between mx-5">
        <Text className="text">Public Protocol</Text>
        <Switch value={isPublic} onValueChange={onToggleSwitch} />
      </View>
      <CreateButton
        protocolDaysPerWeek={Number(daysPerWeek)}
        protocolOutline={outlineText}
        protocolTitle={titleText}
        protocolWeeks={Number(weeksText)}
        protocolPublic={isPublic}
      />
    </>
  )
}

export default StartPage
