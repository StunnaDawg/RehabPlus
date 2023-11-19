import React, { createContext, useContext, useState } from "react"
import {DatabaseExercisesContextAction, DatabaseExercisesContextType} from '../@types/context'
import { ExerciseDataBaseExercise } from "../@types/firestore"

export type DatabaseExercisesContextTyping = DatabaseExercisesContextAction & DatabaseExercisesContextType

type DatabaseExercisesContextProviderProps = {
  children: React.ReactNode
}

const DatabaseExercisesContext = createContext<DatabaseExercisesContextTyping | undefined>(undefined)

export const DatabaseExercisesContextProvider = ({
  children,
}: DatabaseExercisesContextProviderProps) => {
  const [exerciseDataBase, setExerciseDataBase] = useState<ExerciseDataBaseExercise[]>([])


  return (
    <>
    <DatabaseExercisesContext.Provider value={{exerciseDataBase, setExerciseDataBase}}>
      {children}
    </DatabaseExercisesContext.Provider>
    </>
  )
}

export const useDatabaseExercisesContext = (): DatabaseExercisesContextTyping => {
  const context = useContext(DatabaseExercisesContext);
  if (!context) {
      throw new Error('DatabaseExercisesContext must be used within the DatabaseExercisesContextProvider');
  }
  return context;
};


