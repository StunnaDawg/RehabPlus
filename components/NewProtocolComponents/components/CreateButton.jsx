import { View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { db, FIREBASE_AUTH } from '../../../firebase'
import { addDoc, collection } from 'firebase/firestore'
import 'react-native-get-random-values'
import { useCompleteWorkoutContext } from '../../../context/completeWorkoutContext'

const CreateButton = ({protocolTitle, protocolOutline, protocolPublic, protocolPhases}) => {
    const navigation = useNavigation()
    const protocolsCollectionRef = collection(db, "protocols")
    const [completeWorkoutData, setCompleteWorkoutData] =
    useCompleteWorkoutContext([])

    const onSubmitProtocol = async () => {
        try{
        const protocolDocRef = await addDoc(protocolsCollectionRef, {
            title: protocolTitle,
            description: protocolOutline,
            userId: FIREBASE_AUTH?.currentUser?.uid,
            public: protocolPublic
        })

          const phasesSubCollectionRef = collection(protocolDocRef, 'phases');
        console.log(protocolPhases)

        for (const phases of protocolPhases) {
          await addDoc(phasesSubCollectionRef,{
            phases,
            userId: FIREBASE_AUTH?.currentUser?.uid,
          } );
      }
          
      //   const workoutsSubCollectionRef = collection(protocolDocRef, 'workouts');
      //   console.log(protocolWorkouts)

      //   for (const workout of protocolWorkouts) {
      //     await addDoc(workoutsSubCollectionRef,{
      //       workout,
      //       userId: FIREBASE_AUTH?.currentUser?.uid,
      //     } );
      // }
      setCompleteWorkoutData([])
        navigation.navigate("Protocol")
    } catch(err) {
        console.error(err)
    }
    }
  return (
    <View>
      <Button onPress={onSubmitProtocol}>Create Protocol</Button>
    </View>
  )
}

export default CreateButton