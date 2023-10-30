import { View, Text, ScrollView } from "react-native"
import {
  Button,
  IconButton,
  Modal,
  Portal,
  Switch,
  TextInput,
} from "react-native-paper"
import { useEffect, useState } from "react"
import CreateButton from "./components/CreateButton"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useRefreshContext } from "../../context/refreshKey"
import ModalContent from "./components/ModalContent"

import PhasesWidget from "./components/PhasesWidget"
import { collection, deleteDoc, doc } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../firebase"
import GetSingleDoc from "../../functions/getSingleDoc"
import { useNewProtocolContext } from "../../context/newProtocolContext"
import { useCurrentPhasesContext } from "../../context/phasesAddContext"
import GetProtocolWorkouts from "../../functions/getProtocolWorkouts"
import GetProtocolPhases from "../../functions/gteProtocolPhases"

const StartPage = () => {
  const [newProtocolData, setNewProtocol] = useNewProtocolContext()
  const [currentPhasesData, setCurrentPhasesData] = useCurrentPhasesContext()
  const [refreshKey, setRefreshKey] = useRefreshContext()
  const [phasesData, setPhasesData] = useState([])
  const [titleText, setTitleText] = useState("")
  const [outlineText, setOutlineText] = useState("")
  const [isPublic, setIsPublic] = useState(false)
  const [visible, setVisible] = useState(false)
  const [phases, setPhases] = useState([])
  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 150,
  }
  const navigation = useNavigation()
  const route = useRoute()
  const protocolId = route.params?.protocolId
  const currentProtocolRef = collection(db, "protocols")
  const currentProtocol = doc(currentProtocolRef, protocolId || newProtocolData.id)
  const currentProtocolPhases = collection(currentProtocol, "phases")

  const onToggleSwitch = () => setIsPublic(!isPublic)

  const onGoBackDeleteProtocol = async () => {
    try {
      const userId = newProtocolData.userId
      console.log(currentProtocol)
      if (userId === FIREBASE_AUTH?.currentUser?.uid) {
        await deleteDoc(currentProtocol)
        setNewProtocol()
        setPhasesData([])
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    const awaitProtocolGet = async () => {
      await GetSingleDoc(setNewProtocol, currentProtocolRef, protocolId)
    }
    awaitProtocolGet()
  }, [])

  useEffect(() => {
    const awaitPhasesGet = async () => {
      await GetProtocolPhases(
        setPhasesData,
        setRefreshKey,
        currentProtocolPhases
      )
    }
    awaitPhasesGet()
    console.log("phaseData", phasesData)
  }, [])

  useEffect(() => {
    const awaitPhasesGet = async () => {
      await GetProtocolPhases(
        setPhasesData,
        setRefreshKey,
        currentProtocolPhases
      )
    }
    awaitPhasesGet()
    console.log(phasesData)
  }, [refreshKey])

  return (
    <>
      <Button
        onPress={async () => {
          await onGoBackDeleteProtocol()
          navigation.goBack()
        }}
      >
        Go Back
      </Button>
      <View className="mx-4 my-1">
        <Text>Protocol Title</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setTitleText(text)}
        ></TextInput>
      </View>

      <View className="mx-4 my-1">
        <Text>Outline</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setOutlineText(text)}
        ></TextInput>
      </View>

      {/* <View className="mx-4 my-1">
        <Text>Weeks</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setWeeksText(text)}
          keyboardType="numeric"
        ></TextInput>
      </View> */}

      {/* <View className="mx-4 my-1">
        <Text>Days per Week</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setDaysPerWeek(text)}
          placeholderTextColor="black"
          keyboardType="numeric"
        ></TextInput>
      </View> */}
      <View className="flex-1 flex-row items-center justify-between mx-5">
        <Text className="text">Public Protocol</Text>
        <Switch value={isPublic} onValueChange={onToggleSwitch} />
      </View>
      <View></View>
      <CreateButton
        protocolOutline={outlineText}
        protocolTitle={titleText}
        protocolPublic={isPublic}
        protocolId={protocolId || newProtocolData.id}
        // protocolWorkouts={completeWorkoutData}
      />
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <ModalContent
            setVisible={setVisible}
            protocolOutline={outlineText}
            protocolTitle={titleText}
            protocolId={protocolId || newProtocolData.id}
            protocolPublic={isPublic}
          />
        </Modal>
      </Portal>
      <Button icon="plus" onPress={showModal}>
        Add Phase
      </Button>
      <ScrollView>
      {phasesData.map((phase) => {
        console.log('mapped phases', phase)
        return (
          <View key={phase.id}>
          <PhasesWidget
            key={phase.id}
            phasesTitle={phase.title}
            phaseId={phase.id}
          />
          </View>
        )
      })}
      </ScrollView>
    </>
  )
}

export default StartPage
