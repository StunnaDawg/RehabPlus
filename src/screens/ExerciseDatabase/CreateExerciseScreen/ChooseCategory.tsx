import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { ScrollView, View } from "react-native"
import { Text, Card, Button, List, TouchableRipple } from "react-native-paper"
import getExerciseFireStoreData from "../../../functions/getExerciseData"
import { ExerciseDataBaseCategory } from "../../../@types/firestore"
import { db } from "../../../firebase"
import { collection } from "firebase/firestore"

type chooseCategoryProp = {
  chooseExerciseCategories: ExerciseDataBaseCategory[]
  setChooseExerciseCategories: Dispatch<
    SetStateAction<ExerciseDataBaseCategory[]>
  >
  setChosenCategory: Dispatch<SetStateAction<string>>
  chosenCategory: string
  setCategoryId: Dispatch<SetStateAction<string>>
}

const ChooseCategory = ({
  setChooseExerciseCategories,
  chooseExerciseCategories,
  setChosenCategory,
  setCategoryId,
  chosenCategory,
}: chooseCategoryProp) => {
  const [expanded, setExpanded] = useState<boolean>(false)
  const categoriesCollection = collection(db, "exerciseCategories")

  const handlePress = () => setExpanded(!expanded)

  useEffect(() => {
    getExerciseFireStoreData(setChooseExerciseCategories, categoriesCollection)
  }, [])

  return (
    <>
      <View className="my-4">
        <View className="mx-4">
          <List.Accordion
            title={chosenCategory}
            expanded={expanded}
            onPress={handlePress}
          >
            {chooseExerciseCategories.map((category) => (
              <TouchableRipple key={category.id} className="bg-white">
                <List.Item
                  key={category.id}
                  title={category.title}
                  onPress={() => {
                    setChosenCategory(category.title)
                    setCategoryId(category.id)
                    handlePress()
                  }}
                />
              </TouchableRipple>
            ))}
          </List.Accordion>
        </View>
      </View>
    </>
  )
}

export default ChooseCategory
