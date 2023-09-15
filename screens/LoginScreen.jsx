import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native"
  import { useNavigation } from "@react-navigation/native"
  import { useEffect, useState } from "react"
  import { FIREBASE_AUTH } from "../firebase"
  import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
  
  const LoginScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const auth = FIREBASE_AUTH
    const navigation = useNavigation()
    
    useEffect(() => {
        const unsubscribe = FIREBASE_AUTH.onAuthStateChanged(user => {
          if (user) {
            // User is signed in, you might navigate to the dashboard or do something else
            navigation.navigate('Dashboard');
          } else {
            // No user is signed in
          }
        });
        
        return unsubscribe; // This will unsubscribe the listener when the component is unmounted
      }, []);
      
    const handleSignUp = async () => {
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
        console.log(response.email)
      } catch (error) {
        console.log(error)
      }
    }
  
    const handleLogin = async () => {
      try {
        const response = await signInWithEmailAndPassword(
          auth,
          email,
          password
        )
        console.log(`logged in with ${response.email}`)
      } catch (error) {
        console.log(error)
      }
    }
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
  
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>
  
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            onPress={handleSignUp}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
  
  export default LoginScreen
  
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
  