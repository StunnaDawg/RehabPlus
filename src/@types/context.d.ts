import { Dispatch, SetStateAction } from "react"
import {
  Workout,
  Protocol,
  ProtocolPhase,
  Client,
  WorkoutExercise,
  ExerciseDataBaseExercise,
} from "./firestore"

export type RefreshKey = {
  refreshKey: boolean
}

export type RefreshKeyActions = {
  setRefreshKey: Dispatch<SetStateAction<boolean>>
}

export type UserAuth = {
  isSignedIn: boolean
}

export type UserAuthAction = {
  setIsSignedIn: Dispatch<SetStateAction<boolean>>
}

export type SingleWorkoutType = {
  workoutData: Workout
}

export type SingleWorkoutAction = {
  setWorkoutData: Dispatch<SetStateAction<Workout>>
}

export type SingleEditProtocolType = {
  protocolEditData: Protocol
}

export type SingleEditProtocolAction = {
  setProtocolEditData: Dispatch<SetStateAction<Protocol>>
}

export type CurrentPhasesDataType = {
  currentPhasesData: ProtocolPhase
}

export type CurrentPhasesDataAction = {
  setCurrentPhasesData: Dispatch<SetStateAction<ProtocolPhase>>
}

export type NewProtocolDataType = {
  newProtocolData: Protocol
}

export type NewProtocolDataAction = {
  setNewProtocolData: Dispatch<SetStateAction<Protocol>>
}

export type AddClientProtocolDataType = {
  newClientProtocol: string
}

export type AddClientProtocolDataAction = {
  setClientProtocol: Dispatch<SetStateAction<string>>
}

export type EditWorkoutType = {
  editWorkoutData: Workout
}

export type EditWorkoutAction = {
  setEditWorkoutData: Dispatch<SetStateAction<Workout>>
}

export type CompleteWorkoutsDataType = {
  completeWorkoutData: Workout[]
}

export type CompleteWorkoutsAction = {
  setCompleteWorkoutData: Dispatch<SetStateAction<Workout[]>>
}

export type EditClientDataType = {
  clientEditData: Client
}

export type EditClientAction = {
  setClientEditData: Dispatch<SetStateAction<Client>>
}

export type NewWorkoutDataType = {
  newWorkoutData: Workout
}

export type NewWorkoutAction = {
  setNewWorkoutData: Dispatch<SetStateAction<Workout>>
}

export type CurrentPhasesIdAction = {
  setCurrentPhasesId: Dispatch<SetStateAction<string>>
}

export type CurrentPhasesIdType = {
  currentPhasesId: string
}

export type CurrentWorkoutIdAction = {
  setCurrentWorkoutId: Dispatch<SetStateAction<string>>
}

export type CurrentWorkoutIdType = {
  currentWorkoutId: string
}

export type ExercisesContextType = {
  exerciseData: WorkoutExercise[]
}

export type ExercisesContextAction = {
  setExerciseData: Dispatch<SetStateAction<WorkoutExercise[]>>
}

export type DatabaseExercisesContextType = {
  exerciseDataBase: ExerciseDataBaseExercise[]
}

export type DatabaseExercisesContextAction = {
  setExerciseDataBase: Dispatch<SetStateAction<ExerciseDataBaseExercise[]>>
}

export type UserType = {
  userType: boolean
}

export type SetUserType = {
  setUserType: Dispatch<SetStateAction<boolean>>
}

export type IsClientType = {
  isClient: boolean
}

export type SetIsClient = {
  setIsClient: Dispatch<SetStateAction<boolean>>
}
