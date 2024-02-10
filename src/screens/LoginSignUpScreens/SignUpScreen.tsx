import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { useState } from "react"
import { FIREBASE_AUTH, db } from "../../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"
import { Switch } from "react-native-paper"
import { addDoc, collection, doc, setDoc } from "firebase/firestore"

const SignUpScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const auth = FIREBASE_AUTH
  const navigation = useNavigation<NavigationType>()
  const [isPhysician, setIsPhysician] = useState<boolean>(false)

  const onToggleSwitch = () => setIsPhysician(!isPhysician)

  const handleSignUp = async () => {
    try {
      if (isPhysician) {
        await createUserWithEmailAndPassword(auth, email, password)

        const physicianId = FIREBASE_AUTH?.currentUser?.uid
        if (physicianId) {
          const physiciansCollectionRef = doc(db, "physicians", physicianId)
          const newPhysiciansData = {
            name: firstName + "" + lastName,
            email: email,
            physicianId: FIREBASE_AUTH?.currentUser?.uid,
          }
          await setDoc(physiciansCollectionRef, newPhysiciansData)
        } else {
          console.log("no physician id to set")
        }
      } else {
        await createUserWithEmailAndPassword(auth, email, password)
        const clientId = FIREBASE_AUTH?.currentUser?.uid

        if (clientId) {
          const clientsCollectionRef = doc(db, "clients", clientId)
          const newClientData = {
            name: firstName + "" + lastName,
            injuryDescription: "N/A",
            status: true,
            email: email,
            physician: null, // Use the UID from the newly created user
            protocol: null,
            clientId: FIREBASE_AUTH?.currentUser?.uid,
          }
          await setDoc(clientsCollectionRef, newClientData)
        } else {
          console.log("no client id to set")
        }
      }
      // Add the new client data
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          style={styles.input}
        />

        <TextInput
          autoCapitalize="none"
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          style={styles.input}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />

        <TextInput
          autoCapitalize="none"
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <View className="flex flex-row items-center">
          <Text>Physician</Text>
          <Switch value={isPhysician} onValueChange={onToggleSwitch} />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.replace("Login")}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Have an Account?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
})
