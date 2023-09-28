import { View, Text } from "react-native"
import { TextInput } from "react-native-paper"
import { useState } from "react"
import DropDownDays from "./components/DropDownDays"
import UpdateButton from "./components/CreateButton"
import { useSingleProtocolContext } from "../../protocolContext"

const EditStartPage = () => {
  const [protocolEditData] = useSingleProtocolContext()
  const [expanded, setExpanded] = useState(true)
  const [titleText, setTitleText] = useState(protocolEditData.title)
  const [outlineText, setOutlineText] = useState(protocolEditData.description)
  const [weeksText, setWeeksText] = useState(protocolEditData.weeks)
  const [daysPerWeek, setDaysPerWeek] = useState(protocolEditData.daysPerWeek)

  return (
    <>
      <View className="mx-4 my-1">
        <Text>Protocol Title</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setTitleText(text)}
          placeholder={titleText}
          placeholderTextColor='black'
        ></TextInput>
      </View>

      <View className="mx-4 my-1">
        <Text>Outline</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setOutlineText(text)}
          placeholder={outlineText}
          placeholderTextColor='black'
        ></TextInput>
      </View>

      <View className="mx-4 my-1">
        <Text>Weeks</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setWeeksText(text)}
          placeholder={`${weeksText}`}
          placeholderTextColor='black'
        ></TextInput>
      </View>

      <DropDownDays setTheDays={setDaysPerWeek} chosenDays={daysPerWeek} />
      <UpdateButton id={protocolEditData.id} protocolDaysPerWeek={Number(daysPerWeek)} protocolOutline={outlineText} protocolTitle={titleText} protocolWeeks={Number(weeksText)}/>
    </>
  )
}

export default EditStartPage
