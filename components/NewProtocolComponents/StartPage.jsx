import { View, Text } from "react-native"
import { Button, Switch, TextInput } from "react-native-paper"
import { useState } from "react"
import CreateButton from "./components/CreateButton"
import { useNavigation } from "@react-navigation/native"
import AddWorkout from "../AddProtocolWorkoutComponents/AddWorkout"
import { useCompleteWorkoutContext } from "../../completeWorkoutContext"

const StartPage = () => {
  const [completeWorkoutData, setCompleteWorkoutData] =
    useCompleteWorkoutContext([])
  const [titleText, setTitleText] = useState("")
  const [outlineText, setOutlineText] = useState("")
  const [weeksText, setWeeksText] = useState("")
  const [daysPerWeek, setDaysPerWeek] = useState("1")
  const [isPublic, setIsPublic] = useState(false)
  const navigation  = useNavigation()

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
      <View>
      </View>
      <CreateButton
        protocolDaysPerWeek={Number(daysPerWeek)}
        protocolOutline={outlineText}
        protocolTitle={titleText}
        protocolWeeks={Number(weeksText)}
        protocolPublic={isPublic}
        protocolWorkouts={completeWorkoutData}
      />
      <AddWorkout />
    </>
  )
}

export default StartPage
