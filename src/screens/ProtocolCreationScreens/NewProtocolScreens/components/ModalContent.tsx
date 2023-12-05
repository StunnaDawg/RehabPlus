import { View, Text } from "react-native"
import React, { useState } from "react"
import { useCompleteWorkoutContext } from "../../../../context/completeWorkoutContext"
import { Button, TextInput } from "react-native-paper"
import AddPhaseButton from "./AddPhases"

type ModalContentProps = {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  protocolOutline: string
  protocolTitle: string
  protocolId: string
  protocolPublic: boolean
}

const ModalContent = ({
  setVisible,
  protocolOutline,
  protocolTitle,
  protocolId,
  protocolPublic,
}: ModalContentProps) => {
  const [phaseTitleText, setPhaseTitle] = useState<string>("")
  const [outlineText, setOutlineText] = useState<string>("")
  const [weeksText, setWeeksText] = useState<string>("")
  return (
    <>
      <View className="mx-4 my-1">
        <Text>Phase Title</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setPhaseTitle(text)}
        ></TextInput>
      </View>

      <View className="mx-4 my-1">
        <Text>Phase Outline</Text>
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
      <AddPhaseButton
        phaseTitle={phaseTitleText}
        phaseOutline={outlineText}
        weeksText={weeksText}
        setVisible={setVisible}
        protocolOutline={protocolOutline}
        protocolTitle={protocolTitle}
        protocolPublic={protocolPublic}
      />
    </>
  )
}

export default ModalContent
