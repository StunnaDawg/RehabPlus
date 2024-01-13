import { View, Text } from "react-native"
import React, { Dispatch, SetStateAction, useEffect } from "react"
import { Button } from "react-native-paper"
import deleteImage from "../functions/deleteImage"

type DeleteImageProp = {
  fileLocation: string
  setImageUrl: Dispatch<SetStateAction<string>>
}

const DeleteImageButton = ({ fileLocation, setImageUrl }: DeleteImageProp) => {
  useEffect(() => {
    console.log("location of file to delete", fileLocation)
  }, [])
  return (
    <View>
      <Button onPress={() => deleteImage(fileLocation, setImageUrl)}>
        Delete Image
      </Button>
    </View>
  )
}

export default DeleteImageButton
