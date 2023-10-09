import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const AddWorkout = () => {
    const navigation = useNavigation()
  return (
    <View>
      <Button onPress={() => navigation.navigate('CreateWorkout')} icon='plus'>Add Workout</Button>
    </View>
  )
}

export default AddWorkout