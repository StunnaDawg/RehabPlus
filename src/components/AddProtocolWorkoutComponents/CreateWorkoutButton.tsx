
import { Button } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { useCompleteWorkoutContext } from "../../context/completeWorkoutContext"
import { Workout } from "../../@types/firestore"
import { useExerciseContext } from "../../context/exerciseContext"
import { NavigationType } from "../../@types/navigation"

const CreateWorkoutButton = ({workout: {title, description, exercises } = {} }: Workout) => {
    const {setExerciseData} = useExerciseContext()
    const {setCompleteWorkoutData} = useCompleteWorkoutContext()
    const navigation = useNavigation<NavigationType>()

  return (
    <Button
      icon="plus"
      onPress={async () => { setCompleteWorkoutData(prevData => ([
        ...(Array.isArray(prevData) ? prevData : []),
        { workout : {title, description, exercises}}
      ])); setExerciseData([]); navigation.navigate('AddProtocolWorkoutScreen')}}
    >
      Create Workout
    </Button>
  )
}
export default CreateWorkoutButton
