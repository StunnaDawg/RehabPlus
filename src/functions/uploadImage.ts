import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { storage } from "../firebase"
import { Dispatch, SetStateAction } from "react"

const uploadImage = async (
  uri: string,
  fileType: string,
  imageName: string,
  setImageUrl: Dispatch<SetStateAction<string>>,
  onSubmit: (imageDownload: string) => void
) => {
  const response = await fetch(uri)
  const blob = await response.blob()

  const storageRef = ref(storage, imageName)
  const uploadTask = uploadBytesResumable(storageRef, blob)

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log("Progress", progress, "% done")
    },
    (err) => {
      console.error(err)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
        console.log("file avalible at", downloadUrl)
        setImageUrl(downloadUrl)
        onSubmit(downloadUrl)
      })
    }
  )
}

export default uploadImage
