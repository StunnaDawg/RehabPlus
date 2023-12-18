import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import GetProtocolWorkouts from "../../../functions/getProtocolWorkouts"
import { Workout } from "../../../@types/firestore"
import { collection } from "firebase/firestore"
import { db } from "../../../firebase"
import { Button } from "react-native-paper"

type ViewPhaseCardProps = {
  protoclId: string
  id: string
  title: string
  description?: string
  buttonChange: string
}

const ViewPhaseCard = ({
  protoclId,
  id,
  title,
  description,
  buttonChange,
}: ViewPhaseCardProps) => {
  const [phaseWorkouts, setPhaseWorkouts] = useState<Workout[]>([])
  const workoutCollectionRef = collection(
    db,
    "protocols",
    protoclId,
    "phases",
    id,
    "workouts"
  )
  useEffect(() => {
    const getPhaseWorkouts = async () => {
      try {
        console.log(`getting ${id} phase workouts`)
        GetProtocolWorkouts(setPhaseWorkouts, workoutCollectionRef)
      } catch (err) {
        console.error(err)
      }
    }
    getPhaseWorkouts()
  }, [])

  return (
    <View>
      {phaseWorkouts && buttonChange === id
        ? phaseWorkouts.map((workouts) => (
            <Text key={workouts.id}>{workouts.workout?.title}</Text>
          ))
        : null}
    </View>
  )
}

export default ViewPhaseCard
