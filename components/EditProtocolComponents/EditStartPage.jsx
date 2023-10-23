import { View, Text } from "react-native"
import { TextInput, Switch } from "react-native-paper"
import { useState } from "react"
import UpdateButton from "./components/UpdateProtocolButton"
import DeleteButton from "./components/DeleteButton"
import UpdateWorkouts from "./components/UpdateWorkouts"
import { useSingleProtocolContext } from "../../context/protocolContext"

const EditStartPage = () => {
  const [protocolEditData] = useSingleProtocolContext()
  const [titleText, setTitleText] = useState(protocolEditData.title)
  const [outlineText, setOutlineText] = useState(protocolEditData.description)
  const [weeksText, setWeeksText] = useState(protocolEditData.weeks)
  const [daysPerWeek, setDaysPerWeek] = useState(protocolEditData.daysPerWeek)
  const [isPublic, setIsPublic] = useState(protocolEditData?.public || false)

  const onToggleSwitch = () => setIsPublic(!isPublic)

  return (
    <>
    <DeleteButton
          id={protocolEditData.id}
          userId={protocolEditData.userId}
        />
      <View className="mx-4 my-1">
        <Text>Protocol Title</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setTitleText(text)}
          placeholder={titleText}
          placeholderTextColor="black"
        ></TextInput>
      </View>

      <View className="mx-4 my-1">
        <Text>Outline</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setOutlineText(text)}
          placeholder={outlineText}
          placeholderTextColor="black"
        ></TextInput>
      </View>

      <View className="mx-4 my-1">
        <Text>Weeks</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setWeeksText(text)}
          placeholder={`${weeksText}`}
          placeholderTextColor="black"
          keyboardType="numeric"
        ></TextInput>
      </View>

      {/* <DropDownDays setTheDays={setDaysPerWeek} chosenDays={daysPerWeek} /> */}

      <View className="mx-4 my-1">
        <Text>Days per Week</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setDaysPerWeek(text)}
          placeholder={`${daysPerWeek}`}
          placeholderTextColor="black"
          keyboardType="numeric"
        ></TextInput>

      </View>
      <View className='flex-1 flex-row items-center justify-between mx-5'>
        <Text className="text">Public Protocol</Text>
        <Switch value={isPublic} onValueChange={onToggleSwitch} />
      </View>

      <View className="flex-1 flex-row justify-center">
        <UpdateButton
          id={protocolEditData.id}
          protocolDaysPerWeek={Number(daysPerWeek)}
          protocolOutline={outlineText}
          protocolTitle={titleText}
          protocolWeeks={Number(weeksText)}
          protocolPublic={isPublic}
        />
        
        <UpdateWorkouts id={protocolEditData.id} />
      </View>
    </>
  )
}

export default EditStartPage
