import { View, Text, ScrollView } from "react-native"
import { Button, IconButton } from "react-native-paper"
import { useExerciseContext } from "../../../context/exerciseContext"
import { useNavigation } from "@react-navigation/native"

type ModalContentProps = {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  exerciseTitle: string
  exerciseDescription?: string
  exerciseId: string
  categoryId: string
}

const ViewModal = ({
  setVisible,
  exerciseId,
  exerciseDescription,
  exerciseTitle,
  categoryId,
}: ModalContentProps) => {
  const { exerciseData, setExerciseData } = useExerciseContext()
  const navigation = useNavigation()

  const exerciseValues = [
    {
      exercise: {
        id: exerciseId,
        title: exerciseTitle,
      },
      categoryId: categoryId,
    },
  ]

  const AddExerciseToWorkoutHandler = () => {
    if (exerciseData) {
      setExerciseData((prevExercises) => [...prevExercises, ...exerciseValues])
    } else {
      setExerciseData([...exerciseValues])
    }
  }
  return (
    <View>
      <ScrollView>
        <View className="mb-8">
          <View className="mx-2 mb-5">
            <Text className="text-4xl font-bold">{exerciseTitle}</Text>
          </View>
          <View className="flex flex-row justify-center">
            <Text className="text-xl font-bold"> Video or Image</Text>
            <IconButton icon="image-plus" size={100} />
          </View>
          <View className="flex flex-row justify-start">
            <Text className="font-semibold">
              Description:{" "}
              {exerciseDescription ? exerciseDescription : "Coming soon..."}
            </Text>
          </View>
        </View>
      </ScrollView>
      <Button
        onPress={() => {
          AddExerciseToWorkoutHandler()
          setVisible(false)
          navigation.goBack()
        }}
      >
        Add Workout
      </Button>
    </View>
  )
}

export default ViewModal
