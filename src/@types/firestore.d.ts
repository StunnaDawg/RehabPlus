import { CollectionReference } from "firebase/firestore"

export type ProtocolPhase = {
  id: string
  description: string
  title: string
  userId: string
  weeks: string
  workouts: CollectionReference
}

export type Protocol = {
  id: string
  description: string
  title: string
  userId: string
  weeks: string
  public: boolean
  phases: CollectionReference
}

export type Workout = {
  id: string
  workout: {
    description?: string
    title?: string
    exercises?: WorkoutExercise[]
  }
}

export type WorkoutExercise = {
  categoryId: string
  exerciseId: string
  reps?: string
  sets?: string
}

export type ExerciseDataBaseCategory = {
  title: string
  exercises: CollectionReference
}

export type ExerciseDataBaseExercise = {
  exercise: {
    title: string
    description: string
  }
}

export type Client = {
  email: string
  injuryDescription: string
  name: string
  protocol: CollectionReference
  status: boolean
  userId: string //the userId of phsiotherapist
}
