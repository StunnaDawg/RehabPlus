import { View, Text, ScrollView, Image } from "react-native"
import { TextInput, Switch, Portal, Modal, Button } from "react-native-paper"
import { useEffect, useState } from "react"
import UpdateButton from "./components/UpdateProtocolButton"
import DeleteButton from "./components/DeleteButton"
import { useSingleEditProtocolContext } from "../../../context/protocolContext"
import GetProtocolPhases from "../../../functions/getProtocolPhases"
import { useRefreshKeyContext } from "../../../context/refreshKey"
import { collection } from "firebase/firestore"
import { db } from "../../../firebase"
import PhasesWidget from "./components/PhasesWidget"
import ModalContent from "./ModalContent"
import { ProtocolPhase } from "../../../@types/firestore"
import DeleteImageButton from "../../../components/DeleteImageButton"
import UploadImage from "../../../components/UploadImage"

const EditStartPage = () => {
  const { protocolEditData } = useSingleEditProtocolContext()
  const [titleText, setTitleText] = useState(protocolEditData.title)
  const [outlineText, setOutlineText] = useState(protocolEditData.description)
  const [isPublic, setIsPublic] = useState(protocolEditData?.public || false)
  const [protocolEditPhases, setProtocolEditPhases] = useState<
    ProtocolPhase[] | undefined
  >()
  const [imageUrl, setImageUrl] = useState<string>("")
  const [newImageUrl, setNewImageUrl] = useState<string>("")
  const [visible, setVisible] = useState(false)
  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)
  const { refreshKey } = useRefreshKeyContext()
  const protocolPhasesCollectionRef = collection(
    db,
    "protocols",
    protocolEditData.id,
    "phases"
  )

  const onToggleSwitch = () => setIsPublic(!isPublic)

  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 150,
  }

  useEffect(() => {
    const fetchPhases = async () => {
      await GetProtocolPhases(
        setProtocolEditPhases,
        protocolPhasesCollectionRef
      )
    }

    fetchPhases()
  }, [])

  useEffect(() => {
    const fetchPhases = async () => {
      await GetProtocolPhases(
        setProtocolEditPhases,
        protocolPhasesCollectionRef
      )
    }

    fetchPhases()
    console.log("protocol edit phases", protocolEditPhases)
  }, [refreshKey])

  useEffect(() => {
    setImageUrl(newImageUrl)
  }, [newImageUrl])

  useEffect(() => {
    if (protocolEditData.imageUri) {
      console.log(protocolEditData.imageUri)
      setImageUrl(protocolEditData.imageUri)
    }
  }, [])

  return (
    <>
      <DeleteButton id={protocolEditData.id} userId={protocolEditData.userId} />
      <View className="mx-4 my-1">
        <Text>Protocol Title</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setTitleText(text)}
          placeholder={titleText}
          placeholderTextColor="black"
          activeOutlineColor="black"
        ></TextInput>
      </View>

      <View className="mx-4 my-1">
        <Text>Outline</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setOutlineText(text)}
          placeholder={outlineText}
          placeholderTextColor="black"
          activeOutlineColor="black"
        ></TextInput>
      </View>

      <View className="flex-1 flex-row items-center justify-between mx-5">
        <Text className="text">Public Protocol</Text>
        <Switch value={isPublic} onValueChange={onToggleSwitch} />
      </View>

      <View className="flex flex-row justify-center">
        {imageUrl !== "" ? (
          <View className="flex flex-col">
            <Image
              source={{ uri: imageUrl }}
              style={{ width: 200, height: 200 }}
            />
            <DeleteImageButton
              fileLocation={imageUrl}
              setImageUrl={setImageUrl}
              setNewImageUrl={setNewImageUrl}
            />
          </View>
        ) : (
          <UploadImage setUri={setNewImageUrl} showImage={false} />
        )}
      </View>

      <View className="flex-1 flex-row justify-center">
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
              protocolId={protocolEditData.id}
              protocolPublic={isPublic}
            />
          </Modal>
        </Portal>
        <Button icon="plus" textColor="black" onPress={showModal}>
          Add Phase
        </Button>
        <UpdateButton
          id={protocolEditData.id}
          protocolOutline={outlineText}
          protocolTitle={titleText}
          protocolPublic={isPublic}
          imageUrl={newImageUrl}
        />
      </View>

      <ScrollView>
        {protocolEditPhases?.map((phase) => {
          console.log(phase.title)
          if (phase.title == undefined) return null
          return (
            <View key={phase.id}>
              <PhasesWidget phaseId={phase.id} phasesTitle={phase.title} />
            </View>
          )
        })}
      </ScrollView>
    </>
  )
}

export default EditStartPage
