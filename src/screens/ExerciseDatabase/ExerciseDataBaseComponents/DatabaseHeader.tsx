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
  const [pressedButtonId, setPressedButtonId] = useState<string>("")
  const [categories, setCategories] = useState<ExerciseDataBaseCategory[]>([])
  const categoryCollection = collection(db, "exerciseCategories")

  useEffect(() => {
    getExerciseFireStoreData(setCategories, categoryCollection)
  }, [])

  return (
    <>
      <View className=" items-center my-4">
        <Text className="text-xl font-bold">Exercise Database</Text>
      </View>
      <View className="my-2 mx-5">
        <View className="mb-3">
          <Searchbar
            className="bg-white"
            placeholder="Search"
            onChangeText={(query) => {
              setSearchQuery(query)
              setSearchTriggerProp(true)
            }}
            value={searchQuery}
          />
        </View>
        <ScrollView directionalLockEnabled={true} className="flex flex-row">
          <View className="flex flex-row">
            <Button
              className={pressedButtonId === "" ? "bg-sky-400" : "bg-slate-300"}
              textColor="black"
              onPress={() => {
                setShowCategories(true)
                setCategoryIdProp("")
                setPressedButtonId("")
              }}
              mode={pressedButtonId === "" ? "outlined" : "contained"}
            >
              All
            </Button>
            {categories?.map((categoryButton) => (
              <Button
                className={
                  pressedButtonId === categoryButton.id
                    ? "bg-sky-400 mx-1"
                    : "bg-slate-300 mx-1"
                }
                textColor="black"
                onPress={() => {
                  setShowCategories(false)
                  setCategoryIdProp(categoryButton.id)
                  setPressedButtonId(categoryButton.id)
                }}
                key={categoryButton.id}
                mode={
                  pressedButtonId === categoryButton.id
                    ? "outlined"
                    : "contained"
                }
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
