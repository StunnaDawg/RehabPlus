import { View, Text, FlatList, ScrollView } from "react-native"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Button, Searchbar, Title, ButtonProps } from "react-native-paper"
import getExerciseCategoryData from "../../../functions/getExerciseCategoriesData"
import getExerciseFireStoreData from "../../../functions/getExerciseData"
import { ExerciseDataBaseCategory } from "../../../@types/firestore"
import { collection } from "firebase/firestore"
import { db } from "../../../firebase"

type DatabaseHeadBaseProps = {
  setSearchTriggerProp: Dispatch<SetStateAction<boolean>>
  setShowCategories: Dispatch<SetStateAction<boolean>>
  setCategoryIdProp: Dispatch<SetStateAction<string>>
}

const DatabaseHeader = ({
  setSearchTriggerProp,
  setShowCategories,
  setCategoryIdProp,
}: DatabaseHeadBaseProps) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isPressed, setIsPressed] = useState(false)
  const [pressedButtonId, setPressedButtonId] = useState(null)
  const [categories, setCategories] = useState<ExerciseDataBaseCategory[]>([])
  const categoryCollection = collection(db, "exerciseCategories")

  useEffect(() => {
    getExerciseFireStoreData(setCategories, categoryCollection)
  }, [])

  return (
    <>
      <View className=" items-center my-4">
        <Text className="text-xl font-semibold">Add Exercise</Text>
      </View>
      <View className="my-2 mx-5">
        <Searchbar
          placeholder="Search"
          onChangeText={(query) => {
            setSearchQuery(query)
            setSearchTriggerProp(true)
          }}
          value={searchQuery}
        />
        <ScrollView
          directionalLockEnabled={true}
          className="flex flex-row py-2"
        >
          <View className="flex flex-row">
            <Button
              onPress={() => {
                setShowCategories(true)
                setCategoryIdProp("")
              }}
            >
              All
            </Button>
            {categories?.map((categoryButton) => (
              <Button
                onPress={() => {
                  setShowCategories(false)
                  setCategoryIdProp(categoryButton.id)
                }}
                key={categoryButton.id}
              >
                {categoryButton.title}
              </Button>
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  )
}

export default DatabaseHeader
