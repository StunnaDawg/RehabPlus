import { View, Text, ScrollView } from "react-native"
import { TextInput, Switch } from "react-native-paper"
import { useEffect, useState } from "react"
import UpdateButton from "./components/UpdateProtocolButton"
import DeleteButton from "./components/DeleteButton"
import { useSingleProtocolContext } from "../../context/protocolContext"
import GetProtocolPhases from "../../functions/gteProtocolPhases"
import { useRefreshContext } from "../../context/refreshKey"
import { collection } from "firebase/firestore"
import { db } from "../../firebase"
import PhasesWidget from "./components/PhasesWidget"
import { useIsFocused } from "@react-navigation/native"

const EditStartPage = () => {
  const [protocolEditData] = useSingleProtocolContext()
  const [titleText, setTitleText] = useState(protocolEditData.title)
  const [outlineText, setOutlineText] = useState(protocolEditData.description)
  const [isPublic, setIsPublic] = useState(protocolEditData?.public || false)
  const [protocolEditPhases, setProtocolEditPhases] = useState([])
  const [refreshKey, setRefreshKey] = useRefreshContext()
  const protocolPhasesCollectionRef = collection(db, "protocols", protocolEditData.id, "phases")
  const isFocused = useIsFocused()

  const onToggleSwitch = () => setIsPublic(!isPublic)

  useEffect(() => {
    const fetchPhases = async () => {
    GetProtocolPhases(setProtocolEditPhases, setRefreshKey, protocolPhasesCollectionRef)
    }

    fetchPhases()
  }, [isFocused])

  return (
    <>
    <DeleteButton
          id={protocolEditData.id}
          userId={protocolEditData.userId}
        />
      <View className="mx-4 my-1">
        <Text>Protocol Title</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setTitleText(text)}
          placeholder={titleText}
          placeholderTextColor="black"
        ></TextInput>
      </View>

      <View className="mx-4 my-1">
        <Text>Outline</Text>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setOutlineText(text)}
          placeholder={outlineText}
          placeholderTextColor="black"
        ></TextInput>
      </View>


      <View className='flex-1 flex-row items-center justify-between mx-5'>
        <Text className="text">Public Protocol</Text>
        <Switch value={isPublic} onValueChange={onToggleSwitch} />
      </View>

      <View className="flex-1 flex-row justify-center">
        <UpdateButton
          id={protocolEditData.id}
          protocolOutline={outlineText}
          protocolTitle={titleText}
          protocolPublic={isPublic}
        />
        

      </View>

      <ScrollView>
        {protocolEditPhases.map((phase) => {
          console.log(phase.title)
          return (
            <View key={phase.id} >
            <PhasesWidget phaseId={phase.id} phasesTitle={phase.title}/>
            </ View>
          )
        })}
      </ScrollView>
    </>
  )
}

export default EditStartPage
