import { useEffect, useState } from "react"
import { ScrollView, View } from "react-native"
import { Text, Card, Button } from "react-native-paper"
import getExerciseFireStoreData from "../../../functions/getExerciseData"
import { ExerciseDataBaseCategory } from "../../../@types/firestore"
import { db } from "../../../firebase"
import { collection } from "firebase/firestore"

const AddCategory = () => {
  const [name, setName] = useState("")
  const [chooseExerciseCategories, setChooseExerciseCategories] = useState<
    ExerciseDataBaseCategory[]
  >([])
  const categoriesCollection = collection(db, "exerciseCategories")

  useEffect(() => {
    getExerciseFireStoreData(setChooseExerciseCategories, categoriesCollection)
  }, [])

  return (
    <>
      <View>
        {chooseExerciseCategories.map((category) => (
          <Card key={category.id} className="flex flex-1 mx-16">
            <Card.Content>
              <Text>{category.title}</Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => setName(category.title)}>Choose me</Button>
            </Card.Actions>
          </Card>
        ))}
      </View>
    </>
  )
}

export default AddCategory
