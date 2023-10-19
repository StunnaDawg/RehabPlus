import { View, Text, Alert } from 'react-native'
import React from 'react'
import { Button, IconButton } from 'react-native-paper'
import { FIREBASE_AUTH, db } from '../../../firebase'
import { collection, deleteDoc, doc, getDoc, updateDoc, deleteField } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { useRefreshContext } from '../../../refreshKey'

const ExerciseWidgetDeleteButton = ({workoutId, protocolId, exerciseId, userId}) => {
    const [refreshKey, setRefreshKey] = useRefreshContext(false)
    const navigation = useNavigation()
    const protocolRef = doc(db, "protocols", protocolId)
    const currentWorkout = doc(protocolRef, 'workouts', workoutId)

    const DeleteExerciseButton = () =>
    Alert.alert('Warning', 'Are you sure you want to delete this exercise?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Delete', onPress: async () => {
        if (userId === FIREBASE_AUTH?.currentUser?.uid) {
            console.log('before set', refreshKey)
            try {
                console.log('Delete pressed');
    
                const workoutDoc = await getDoc(currentWorkout);

                if (workoutDoc.exists()) {
                    // Extract the exercises array
                    const exercises = workoutDoc.data().workout.exercises || [];
    
                    // Find the index of the exercise to be deleted using its exerciseId
                    const exerciseIndex = exercises.findIndex(ex => ex.exerciseId === exerciseId);
    
                    // If the exercise is found, remove it from the array
                    if (exerciseIndex !== -1) {
                        exercises.splice(exerciseIndex, 1);
                    }
    
                    // Update the workout document with the modified exercises array
                    await updateDoc(currentWorkout, { "workout.exercises": exercises });
                    setRefreshKey(!refreshKey);
                    console.log('after set', refreshKey)
                }

    
            } catch (err) {
                console.error(err);
            }
        } }, style: 'destructive'},
    ]);

 return (
    <IconButton icon="delete" size={18} onPress={DeleteExerciseButton}>
        Delete
        </IconButton>
  )
} 

export default ExerciseWidgetDeleteButton