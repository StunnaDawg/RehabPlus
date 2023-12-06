import { useState } from "react"
import { ScrollView, View } from "react-native"
import { Text, List, Checkbox } from "react-native-paper"

const AddCategory = () => {
  const [checked, setChecked] = useState(false)

  const handlePress = () => setChecked(!checked)

  return (
    <>
      <View>
        <Text>Choose Your Category</Text>
      </View>

      <View>
        <Checkbox.IOS status="checked" />
        <Text>Bicep</Text>
      </View>
    </>
  )
}

export default AddCategory
