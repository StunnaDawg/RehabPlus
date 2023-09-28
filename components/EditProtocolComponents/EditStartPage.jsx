import { View, Text } from "react-native"
import { TextInput } from "react-native-paper"
import { useContext, useEffect, useState } from "react"
import DropDownDays from "./components/DropDownDays"
import UpdateButton from "./components/CreateButton"
import { db } from "../../firebase"
import {collection} from "firebase/firestore"
import { useSingleProtocolContext } from "../../protocolContext"

const EditStartPage = () => {
  const [protocolEditData] = useSingleProtocolContext()
  const [expanded, setExpanded] = useState(true)
  const [titleText, setTitleText] = useState(protocolEditData.title)
  const [outlineText, setOutlineText] = useState(protocolEditData.description)
  const [weeksText, setWeeksText] = useState(protocolEditData.weeks)
  const [daysPerWeek, setDaysPerWeek] = useState(protocolEditData.daysPerWeek)

  useEffect(() => {
console.log("protocol edit data", protocolEditData)
console.log('id', protocolEditData.id)
  }, [protocolEditData])

  return (
    <>
      <View className="mx-4 my-1">
        <Text>Protocol Title</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setTitleText(text)}
        >{titleText}</TextInput>
      </View>

      <View className="mx-4 my-1">
        <Text>Outline</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setOutlineText(text)}
        >{outlineText}</TextInput>
      </View>

      <View className="mx-4 my-1">
        <Text>Weeks</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setWeeksText(text)}
        >{weeksText}</TextInput>
      </View>

      <DropDownDays setTheDays={setDaysPerWeek} chosenDays={daysPerWeek} />
      <UpdateButton protocolDaysPerWeek={Number(daysPerWeek)} protocolOutline={outlineText} protocolTitle={titleText} protocolWeeks={Number(weeksText)}/>
    </>
  )
}

export default EditStartPage
