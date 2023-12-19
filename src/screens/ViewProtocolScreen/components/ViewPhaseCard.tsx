import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import GetProtocolWorkouts from "../../../functions/getProtocolWorkouts"
import { Workout } from "../../../@types/firestore"
import { collection } from "firebase/firestore"
import { db } from "../../../firebase"
import { Button, Divider } from "react-native-paper"
import ViewWorkoutsPhases from "./ViewWorkoutsPhases"
import { NavigationType } from "../../../@types/navigation"
import { useNavigation } from "@react-navigation/native"

type ViewPhaseCardProps = {
  protocolId: string
  phaseId: string
  title: string
  description?: string
  buttonChange: string
}

const ViewPhaseCard = ({
  protocolId,
  phaseId,
  title,
  description,
  buttonChange,
}: ViewPhaseCardProps) => {
  const [phaseWorkouts, setPhaseWorkouts] = useState<Workout[]>([])
  const [showWorkout, setShowWorkout] = useState<string | undefined>("")
  const navigation = useNavigation<NavigationType>()
  const workoutCollectionRef = collection(
    db,
    "protocols",
    protocolId,
    "phases",
    phaseId,
    "workouts"
  )
  useEffect(() => {
    const getPhaseWorkouts = async () => {
      try {
        console.log(`getting ${phaseId} phase workouts`)
        GetProtocolWorkouts(setPhaseWorkouts, workoutCollectionRef)
      } catch (err) {
        console.error(err)
      }
    }
    getPhaseWorkouts()
  }, [])

  return (
    <View>
      {phaseWorkouts && buttonChange === phaseId
        ? phaseWorkouts.map((workouts) => (
            <>
              <View key={workouts.id} className="my-10">
                <Button
                  onPress={() => setShowWorkout(workouts.id)}
                  className="text-xl"
                >
                  {workouts.workout?.title}
                </Button>
                {workouts.id ? (
                  <Button
                    onPress={() =>
                      navigation.navigate("TestWorkout", {
                        id: workouts.id,
                        protocolId: protocolId,
                        phaseId: phaseId,
                      })
                    }
                  >
                    Test Workout
                  </Button>
                ) : null}

                {showWorkout === workouts.id ? (
                  <ViewWorkoutsPhases
                    workoutId={workouts.id}
                    protocolId={protocolId}
                    phaseId={phaseId}
                  />
                ) : null}
                <Divider />
              </View>
            </>
          ))
        : null}
    </View>
  )
}

export default ViewPhaseCard
