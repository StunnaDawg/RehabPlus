import { Dispatch, SetStateAction } from "react"
import { storage } from "../firebase"
import { ref, deleteObject } from "firebase/storage"

const deleteImage = async (
  fileLocation: string,
  setImageUrl: Dispatch<SetStateAction<string>>
) => {
  const imageRef = ref(storage, fileLocation)

  try {
    deleteObject(imageRef)
    setImageUrl("")
  } catch (err) {
    console.error(err)
  }
}

export default deleteImage
