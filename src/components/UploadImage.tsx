import { View, Text, Image } from "react-native"
import * as ImagePicker from "expo-image-picker"
import React, { Dispatch, SetStateAction, useState } from "react"
import * as FileSystem from "expo-file-system"
import { Button } from "react-native-paper"
import { storage } from "../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { addDoc, collection, onSnapshot } from "firebase/firestore"

type UploadImageType = {
  setUri: Dispatch<SetStateAction<string>>
  showImage: boolean
}

const UploadImage = ({ setUri, showImage }: UploadImageType) => {
  const [image, setImage] = useState<string>("")
  const [uploading, setUploading] = useState<boolean>(false)

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
      setUri(result.assets[0].uri)
    }
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {image && showImage && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <Button onPress={pickImage}>Pick an image from camera roll</Button>
    </View>
  )
}

export default UploadImage
