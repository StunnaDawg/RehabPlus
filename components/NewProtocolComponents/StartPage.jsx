import { View, Text } from "react-native"
import { Button, Modal, Portal, Switch, TextInput } from "react-native-paper"
import { useState } from "react"
import CreateButton from "./components/CreateButton"
import { useNavigation } from "@react-navigation/native"
import AddWorkout from "../AddProtocolWorkoutComponents/AddWorkout"
import { useCompleteWorkoutContext } from "../../context/completeWorkoutContext"
import ModalContent from "./components/ModalContent"
import { usePhasesContext } from "../../context/phasesAddContext"
import PhasesWidget from "./components/PhasesWidget"

const StartPage = () => {
  const [phasesData, setPhasesData] = usePhasesContext([])
  const [titleText, setTitleText] = useState("")
  const [outlineText, setOutlineText] = useState("")
  // const [weeksText, setWeeksText] = useState("")
  // const [daysPerWeek, setDaysPerWeek] = useState("1")
  const [isPublic, setIsPublic] = useState(false)
  const [visible, setVisible] = useState(false);
  const [phases, setPhases] = useState ([])

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20, marginBottom: 150};
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

      {/* <View className="mx-4 my-1">
        <Text>Weeks</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setWeeksText(text)}
          keyboardType="numeric"
        ></TextInput>
      </View> */}

      {/* <View className="mx-4 my-1">
        <Text>Days per Week</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setDaysPerWeek(text)}
          placeholderTextColor="black"
          keyboardType="numeric"
        ></TextInput>
      </View> */}
      <View className="flex-1 flex-row items-center justify-between mx-5">
        <Text className="text">Public Protocol</Text>
        <Switch value={isPublic} onValueChange={onToggleSwitch} />
      </View>
      <View>
      </View>
      <CreateButton
        protocolOutline={outlineText}
        protocolTitle={titleText}
        protocolPublic={isPublic}
        protocolPhases={phases}
        // protocolWorkouts={completeWorkoutData}
      />
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <ModalContent setVisible={setVisible} />
        </Modal>
      </Portal>
      <Button icon='plus' onPress={showModal}>Add Phase</Button>
      {phasesData.map((phase, index) => {
        return (
<PhasesWidget key={index} phasesTitle={phase.title}/>
        )
      })}
    </>
  )
}

export default StartPage
