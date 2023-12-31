import { View } from "react-native"
import React from "react"
import DatabaseHeader from "./ExerciseDataBaseComponents/DatabaseHeader"
import DatabaseCategories from "./ExerciseDataBaseComponents/DatabaseCategories"

const ExerciseDataBase = () => {
  return (
    <>
      <View>
        <View className="my-4">
          <DatabaseHeader />
        </View>

        <View>
          <DatabaseCategories />
        </View>
      </View>
    </>
  )
}

export default ExerciseDataBase
