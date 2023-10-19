import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const UpdateWorkouts = () => {
    const navigation = useNavigation()
  return (
    <View>
      <Button onPress={() => navigation.navigate('EditProtocolWorkoutScreen')}>Update Workouts</Button>
    </View>
  )
}

export default UpdateWorkouts