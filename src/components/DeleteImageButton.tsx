import { View, Text } from "react-native"
import React, { Dispatch, SetStateAction } from "react"
import { Button } from "react-native-paper"
import deleteImage from "../functions/deleteImage"

type DeleteImageProp = {
  fileLocation: string
  setImageUrl: Dispatch<SetStateAction<string>>
}

const DeleteImageButton = ({ fileLocation, setImageUrl }: DeleteImageProp) => {
  return (
    <View>
      <Button onPress={() => deleteImage(fileLocation, setImageUrl)}>
        Delete Image
      </Button>
    </View>
  )
}

export default DeleteImageButton
