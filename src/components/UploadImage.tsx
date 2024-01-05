import { View, Text, Image } from "react-native"
import * as ImagePicker from "expo-image-picker"
import React, { Dispatch, SetStateAction, useState } from "react"
import * as FileSystem from "expo-file-system"
import { Button } from "react-native-paper"
import { storage } from "../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { addDoc, collection, onSnapshot } from "firebase/firestore"

type UrploadImageType = {
  setUri: Dispatch<SetStateAction<string>>
}

const UploadImage = ({ setUri }: UrploadImageType) => {
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

  // const uploadMedia = async (uri: string, fileType: string) => {
  //   const response = await fetch(uri)
  //   const blob = await response.blob()

  //   const storageRef = ref(storage, "/Stuff" + new Date().getTime())
  //   const uploadTask = uploadBytesResumable(storageRef, blob)

  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       console.log("Progress", progress, "% done")
  //     },
  //     (err) => {
  //       console.error(err)
  //     },
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
  //         console.log("file avalible at", downloadUrl)
  //         setImage("")
  //       })
  //     }
  //   )
  // }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <Button onPress={pickImage}>Pick an image from camera roll</Button>
    </View>
  )
}

export default UploadImage
