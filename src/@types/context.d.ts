import { Dispatch, SetStateAction } from "react";
import { Workout, Protocol, ProtocolPhase, Client } from "./firestore";

export type RefreshKey = {
    refreshKey: boolean;
}

export type RefreshKeyActions = {
   setRefreshKey: Dispatch<SetStateAction<boolean>>;
};

export type UserAuth = {
    isSignedIn: boolean;
}

export type UserAuthAction = { 
    setIsSignedIn: Dispatch<SetStateAction<boolean>>
}

export type SingleWorkoutType = {
    exerciseWorkoutData: Workout[];
}

export type SingleWorkoutAction = { 
    setExerciseWorkoutData: Dispatch<SetStateAction<Workout[]>>
}

export type SingleEditProtocolType = {
    protocolEditData: Protocol[];
}

export type SingleEditProtocolAction = { 
    setProtocolEditData: Dispatch<SetStateAction<Protocol[]>>
}

export type CurrentPhasesDataType = { 
    currentPhasesData: ProtocolPhase[];
}

export type CurrentPhasesDataAction = { 
    setCurrentPhasesData: Dispatch<SetStateAction<ProtocolPhase[]>>
}

export type NewProtocolDataType = { 
    newProtocolData: Protocol[];
}

export type NewProtocolDataAction = { 
    setNewProtocolData: Dispatch<SetStateAction<Protocol[]>>
}

export type AddClientProtocolDataType = { 
    newClientProtocol: string;
}

export type AddClientProtocolDataAction = { 
    setClientProtocol: Dispatch<SetStateAction<string>>
}

export type EditWorkoutType = { 
    editWorkoutData: Workout[];
}

export type EditWorkoutAction = { 
    setEditWorkoutData: Dispatch<SetStateAction<Workout[]>>
}

export type CompleteWorkoutDataType = { 
    completeWorkoutData: Workout[];
}

export type CompleteWorkoutAction = { 
    setCompleteWorkoutData: Dispatch<SetStateAction<Workout[]>>
}

export type EditClientDataType = { 
    clientEditData: Client[];
}

export type EditClientAction = { 
    setClientEditData: Dispatch<SetStateAction<Client[]>>
}

export type NewWorkoutDataType = { 
    newWorkoutData: Workout[];
}

export type NewWorkoutAction = { 
    setNewWorkoutData: Dispatch<SetStateAction<Workout[]>>
}