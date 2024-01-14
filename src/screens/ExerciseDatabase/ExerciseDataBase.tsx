import { View } from "react-native"
import React, { useEffect, useState } from "react"
import DatabaseHeader from "./ExerciseDataBaseComponents/DatabaseHeader"
import DatabaseCategories from "./ExerciseDataBaseComponents/DatabaseCategories"

const ExerciseDataBase = () => {
  const [search, setSearch] = useState<boolean>(false)
  const [showAllCategories, setShowAllCategories] = useState<boolean>(false)

  useEffect(() => {
    console.log("trigger")
  }, [showAllCategories])

  return (
    <>
      <View>
        <View className="my-4">
          <DatabaseHeader
            setSearchTriggerProp={setSearch}
            setShowCategories={setShowAllCategories}
          />
        </View>

        <View>
          <DatabaseCategories
            setSearchTriggerProp={setSearch}
            allCategories={showAllCategories}
          />
        </View>
      </View>
    </>
  )
}

export default ExerciseDataBase
