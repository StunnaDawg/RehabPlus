import { View } from "react-native"
import React, { useEffect, useState } from "react"
import DatabaseHeader from "./ExerciseDataBaseComponents/DatabaseHeader"
import DatabaseCategories from "./ExerciseDataBaseComponents/DatabaseCategories"

const ExerciseDataBase = () => {
  const [search, setSearch] = useState<boolean>(false)
  const [showAllCategories, setShowAllCategories] = useState<boolean>(false)
  const [categoryId, setCategoryId] = useState<string>("")

  useEffect(() => {
    console.log("trigger")
  }, [showAllCategories])

  return (
    <>
      <View className=" flex flex-1 bg-slate-500">
        <View className="my-4">
          <DatabaseHeader
            setSearchTriggerProp={setSearch}
            setShowCategories={setShowAllCategories}
            setCategoryIdProp={setCategoryId}
          />
        </View>

        <View>
          <DatabaseCategories
            setSearchTriggerProp={setSearch}
            allCategories={showAllCategories}
            categoryId={categoryId}
          />
        </View>
      </View>
    </>
  )
}

export default ExerciseDataBase
