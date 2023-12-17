import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import GetProtocolWorkouts from "../../../functions/getProtocolWorkouts"
import { Workout } from "../../../@types/firestore"
import { collection } from "firebase/firestore"
import { db } from "../../../firebase"

type ViewPhaseCardProps = {
  protoclId: string
  id: string
  title: string
  description?: string
}

const ViewPhaseCard = ({
  protoclId,
  id,
  title,
  description,
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
      <Text>{title}</Text>
      {phaseWorkouts ? (
        phaseWorkouts.map((workouts) => (
          <Text key={workouts.id}>{workouts.workout?.title}</Text>
        ))
      ) : (
        <Text>No workouts</Text>
      )}
    </View>
  )
}

export default ViewPhaseCard
