import { View, Text } from "react-native"
import React, { Dispatch, SetStateAction, useEffect } from "react"
import { Button } from "react-native-paper"
import deleteImage from "../functions/deleteImage"

type DeleteImageProp = {
  fileLocation: string
  setImageUrl: Dispatch<SetStateAction<string>>
  setNewImageUrl: Dispatch<SetStateAction<string>>
}

const DeleteImageButton = ({
  fileLocation,
  setImageUrl,
  setNewImageUrl,
}: DeleteImageProp) => {
  useEffect(() => {
    console.log("location of file to delete", fileLocation)
  }, [])
  return (
    <View>
      <Button
        textColor="black"
        onPress={() => {
          deleteImage(fileLocation, setImageUrl)
          setNewImageUrl("")
        }}
      >
        Delete Image
      </Button>
    </View>
  )
}

export default DeleteImageButton
