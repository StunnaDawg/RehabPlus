import { View, Text } from "react-native"
import { TextInput } from "react-native-paper"
import { useState } from "react"
import DropDownDays from "./components/DropDownDays"
import CreateButton from "./components/CreateButton"
import { db } from "../../firebase"
import {collection} from "firebase/firestore"

const StartPage = () => {
  const [expanded, setExpanded] = useState(true)
  const [titleText, setTitleText] = useState("")
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
      <CreateButton protocolDaysPerWeek={Number(daysPerWeek)} protocolOutline={outlineText} protocolTitle={titleText} protocolWeeks={Number(weeksText)}/>
    </>
  )
}

export default StartPage
