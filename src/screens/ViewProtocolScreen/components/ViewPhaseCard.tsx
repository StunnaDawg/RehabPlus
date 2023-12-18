import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import GetProtocolWorkouts from "../../../functions/getProtocolWorkouts"
import { Workout } from "../../../@types/firestore"
import { collection } from "firebase/firestore"
import { db } from "../../../firebase"
import { Button } from "react-native-paper"
import ViewWorkoutsPhases from "./ViewWorkoutsPhases"

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
              <Text key={workouts.id}>{workouts.workout?.title}</Text>
              <ViewWorkoutsPhases
                workoutId={workouts.id}
                protocolId={protocolId}
                phaseId={phaseId}
              />
            </>
          ))
        : null}
    </View>
  )
}

export default ViewPhaseCard
