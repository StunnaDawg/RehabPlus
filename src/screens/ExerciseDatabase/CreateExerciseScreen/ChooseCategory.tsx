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
}

const ChooseCategory = ({
  setChooseExerciseCategories,
  chooseExerciseCategories,
  setChosenCategory,
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
      <View>
        <View className="mx-4">
          <List.Section title="Choose Category">
            <List.Accordion
              title={chosenCategory}
              expanded={expanded}
              onPress={handlePress}
            >
              {chooseExerciseCategories.map((category) => (
                <TouchableRipple key={category.id}>
                  <List.Item
                    key={category.id}
                    title={category.title}
                    onPress={() => {
                      setChosenCategory(category.title)
                      handlePress()
                    }}
                  />
                </TouchableRipple>
              ))}
            </List.Accordion>
          </List.Section>
        </View>
      </View>
    </>
  )
}

export default ChooseCategory
