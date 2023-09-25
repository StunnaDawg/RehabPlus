import { View, Text, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import ProtocolScreenWidget from "../components/ProtocolScreenComponents/ProtocolScreenWidget"
import ProtocolScreenHeader from "../components/ProtocolScreenComponents/ProtocolScreenHeader"
import { db } from "../firebase"
import { getDocs, collection } from "firebase/firestore"

const ProtocolScreen = () => {
  const [protocolList, setProtocolList] = useState([])
  const protocolsCollectionRef = collection(db, "protocols")

  useEffect(() => {
    const getProtocolList = async () => {
      try {
        const data = await getDocs(protocolsCollectionRef)
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        console.log(filteredData)
        setProtocolList(filteredData)
      } catch (err) {
        console.error(err)
      }
    }
    getProtocolList()
  }, [])
  return (
    <>
      <ScrollView>
        <ProtocolScreenHeader />
        {protocolList.map((protocol) => (
          <ProtocolScreenWidget
          key={protocol.id}
            weeks={protocol.weeks}
            protocolTitle={protocol.title}
            outline={protocol.description}
          />
        ))}
      </ScrollView>
    </>
  )
}

export default ProtocolScreen
