import { View, Text, ScrollView } from "react-native"
import { Button, Modal, Portal, Switch, TextInput } from "react-native-paper"
import { useEffect, useState } from "react"
import CreateButton from "./components/CreateButton"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { useRefreshKeyContext } from "../../../context/refreshKey"
import ModalContent from "./components/ModalContent"

import PhasesWidget from "./components/PhasesWidget"
import { collection, deleteDoc, doc } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../../firebase"
import GetSingleDoc from "../../../functions/getSingleDoc"
import { useNewProtocolDataContext } from "../../../context/newProtocolContext"
import GetProtocolPhases from "../../../functions/getProtocolPhases"
import { RouteParamsType } from "../../../@types/navigation"
import { Protocol, ProtocolPhase } from "../../../@types/firestore"
import UploadImage from "../../../components/UploadImage"

const StartPage = () => {
  const { newProtocolData, setNewProtocolData } = useNewProtocolDataContext()
  const { refreshKey } = useRefreshKeyContext()
  const [phasesData, setPhasesData] = useState<ProtocolPhase[] | undefined>([])
  const [titleText, setTitleText] = useState("")
  const [outlineText, setOutlineText] = useState("")
  const [isPublic, setIsPublic] = useState(false)
  const [visible, setVisible] = useState(false)
  const [imageUri, setImageUri] = useState<string>("")
  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 150,
  }
  const navigation = useNavigation()
  const route = useRoute<RouteProp<Record<string, RouteParamsType>, string>>()
  const protocolId = route.params?.protocolId
  const currentProtocolId = protocolId || newProtocolData.id
  const currentProtocolRef = collection(db, "protocols")
  const currentProtocol = doc(
    currentProtocolRef,
    protocolId || newProtocolData.id
  )
  const currentProtocolPhases = collection(currentProtocol, "phases")

  const onToggleSwitch = () => setIsPublic(!isPublic)

  const onGoBackDeleteProtocol = async () => {
    try {
      const userId = newProtocolData.userId
      console.log(currentProtocol)
      if (userId === FIREBASE_AUTH?.currentUser?.uid) {
        await deleteDoc(currentProtocol)
        setNewProtocolData({} as Protocol)
        setPhasesData([])
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    const awaitProtocolGet = async () => {
      await GetSingleDoc(
        setNewProtocolData,
        currentProtocolRef,
        currentProtocolId
      )
    }
    awaitProtocolGet()
  }, [])

  useEffect(() => {
    const awaitPhasesGet = async () => {
      await GetProtocolPhases(setPhasesData, currentProtocolPhases)
    }
    awaitPhasesGet()
    console.log("phaseData", phasesData)
  }, [])

  useEffect(() => {
    const awaitPhasesGet = async () => {
      await GetProtocolPhases(setPhasesData, currentProtocolPhases)
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
        textColor="black"
      >
        Go Back
      </Button>
      <View className="mx-4 my-1">
        <Text>Protocol Title</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setTitleText(text)}
          activeOutlineColor="black"
        ></TextInput>
      </View>

      <View className="mx-4 my-1">
        <Text>Outline</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setOutlineText(text)}
          activeOutlineColor="black"
        ></TextInput>
      </View>

      <View className="flex-1 flex-row items-center justify-between mx-5">
        <Text className="text">Public Protocol</Text>
        <Switch value={isPublic} onValueChange={onToggleSwitch} />
      </View>

      <UploadImage setUri={setImageUri} showImage={true} />

      <CreateButton
        protocolOutline={outlineText}
        protocolTitle={titleText}
        protocolPublic={isPublic}
        protocolId={protocolId || newProtocolData.id}
        imageUri={imageUri}
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
      <Button textColor="black" icon="plus" onPress={showModal}>
        Add Phase
      </Button>
      <ScrollView>
        {phasesData?.map((phase) => {
          console.log("mapped phases", phase)
          return (
            <View key={phase.id}>
              <PhasesWidget phaseTitle={phase.title} phaseId={phase.id} />
            </View>
          )
        })}
      </ScrollView>
    </>
  )
}

export default StartPage
