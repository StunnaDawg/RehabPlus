import { View, Text, Image } from "react-native"
import * as ImagePicker from "expo-image-picker"
import React, { Dispatch, SetStateAction, useState } from "react"
import * as FileSystem from "expo-file-system"
import { Button } from "react-native-paper"
import { getStorage, ref, uploadString } from "firebase/storage"

type UrploadImageType = {
  setUri: Dispatch<SetStateAction<string>>
}

const UploadImage = ({ setUri }: UrploadImageType) => {
  const [image, setImage] = useState<string | null>()
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

  const uploadMedia = async () => {
    setUploading(true)

    try {
      if (image) {
        const { uri } = await FileSystem.getInfoAsync(image)

        const blob: string = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest()
          xhr.onload = () => {
            resolve(xhr.response)
          }
          xhr.onerror = (e) => {
            reject(new TypeError("Network Request Failed"))
            console.error(e)
          }
          xhr.responseType = "blob"
          xhr.open("GET", uri, true)
          xhr.send(null)
        })

        const fileName = image.substring(image.lastIndexOf("/") + 1)
        const storage = getStorage()
        const storageRef = ref(storage, fileName)

        await uploadString(storageRef, blob, "base64", {
          contentType: "image/jpeg",
        })

        console.log("imageUploaded")
        setImage("")
      }
    } catch (err) {
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <Button onPress={pickImage}>Pick an image from camera roll</Button>
      <Button onPress={uploadMedia}>Upload Image</Button>
    </View>
  )
}

export default UploadImage
