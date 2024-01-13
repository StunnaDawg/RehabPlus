import { Dispatch, SetStateAction } from "react"
import { ref, deleteObject, getStorage } from "firebase/storage"

const deleteImage = async (
  fileLocation: string,
  setImageUrl: Dispatch<SetStateAction<string>>
) => {
  const storage = getStorage()
  const imageRef = ref(storage, fileLocation)

  try {
    deleteObject(imageRef)
      .then(() => {
        console.log("Deleted Image", imageRef)
      })
      .catch((error) => {
        console.log("Error", error)
      })
    setImageUrl("")
  } catch (err) {
    console.error(err)
  }
}

export default deleteImage
