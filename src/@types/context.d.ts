import { Dispatch, SetStateAction } from "react";

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
    exerciseWorkoutData: string[];
}

export type SingleWorkoutAction = { 
    setExerciseWorkoutData: Dispatch<SetStateAction<string[]>>
}

export type SingleEditProtocolType = {
    protocolEditData: string[];
}

export type SingleEditProtocolAction = { 
    setProtocolEditData: Dispatch<SetStateAction<string[]>>
}

export type CurrentPhasesDataType = { 
    currentPhasesData: string[];
}

export type CurrentPhasesDataAction = { 
    setCurrentPhasesData: Dispatch<SetStateAction<string[]>>
}

export type NewProtocolDataType = { 
    newProtocolData: string[];
}

export type NewProtocolDataAction = { 
    setNewProtocolData: Dispatch<SetStateAction<string[]>>
}

export type AddClientProtocolDataType = { 
    newClientProtocol: string;
}

export type AddClientProtocolDataAction = { 
    setClientProtocol: Dispatch<SetStateAction<string>>
}

export type EditWorkoutType = { 
    editWorkoutData: string[];
}

export type EditWorkoutAction = { 
    setEditWorkoutData: Dispatch<SetStateAction<string[]>>
}

export type CompleteWorkoutDataType = { 
    completeWorkoutData: string[];
}

export type CompleteWorkoutAction = { 
    setCompleteWorkoutData: Dispatch<SetStateAction<string[]>>
}

export type EditClientDataType = { 
    clientEditData: string[];
}

export type EditClientAction = { 
    setClientEditData: Dispatch<SetStateAction<string[]>>
}

export type NewWorkoutDataType = { 
    newWorkoutData: string[];
}

export type NewWorkoutAction = { 
    setNewWorkoutData: Dispatch<SetStateAction<string[]>>
}