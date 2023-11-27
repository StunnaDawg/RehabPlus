import { CollectionReference, DocumentReference } from "firebase/firestore"
import { UserCredential } from "firebase/auth"


export type ProtocolPhase = {
  id: string
  description?: string
  title?: string
  userId: string
  weeks?: string
  workouts?: CollectionReference
}

export type Protocol = {
  id: string
  description?: string
  title: string
  userId: string
  weeks?: string
  public?: boolean
  phases?: CollectionReference
}

export type Workout = {
    id?: string
    workout?: {
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
    id: string
  title: string
  exercises?: ExerciseDataBaseExercise[]
}

export type ExerciseDataBaseExercise = {
    id: string
    title: string
    description?: string
}

export type Client = {
    id: string
  email: string
  injuryDescription: string
  name: string
  protocol: DocumentReference
  status: boolean
  userId: string //the userId of phsiotherapist
}

