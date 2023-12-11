import { View, Text } from "react-native"
import React from "react"

type ModalContentProps = {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  exerciseId: string
}

const ViewModal = ({ setVisible, exerciseId }: ModalContentProps) => {
  return (
    <View>
      <Text>View Exercise</Text>
      <Text>{exerciseId}</Text>
    </View>
  )
}

export default ViewModal
