import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const { width } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (isLoggedIn === "true") {
        navigation.navigate("Home");
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("https://3.8.94.61:8080/api/user/login", {
        email,
        password,
      });

      // If successful, store login flag and navigate
      if (response.status === 200) {
        await AsyncStorage.setItem("isLoggedIn", "true");
        await AsyncStorage.setItem("userToken", response.data.token || "");
        navigation.navigate("Home");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Alert.alert("Login Failed", "Invalid credentials. Please try again.");
      } else {
        Alert.alert("Error", "Unable to login. Please try later.");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.circle}>
        <Image
          source={require("../assets/images/splashscreenicon.png")}
          style={styles.logo}
        />
      </View>
      <Text style={styles.title}>Welcome Back to</Text>
      <Text style={styles.titleBold}>Good Breach !</Text>

      <TextInput
        style={styles.input}
        placeholder="Your email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text style={styles.forgot}>Forgot Password</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.btnText}>Log In</Text>
      </TouchableOpacity>

      <Text style={styles.create}>Create an Account</Text>
      <Text style={styles.help}>Having Trouble Logging In?</Text>

      <Text style={styles.exclusive}>
        Exclusive access.{"\n"}Invite-only community
      </Text>
      <Text style={styles.footer}>
        Good habits are contagious. Get invited to start saving
      </Text>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff0f3",
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fde2e4",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 40,
    height: 50,
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#1C1825" },
  titleBold: { fontSize: 24, fontWeight: "bold", color: "#1C1825" },
  input: {
    backgroundColor: "#fde2e4",
    borderRadius: 10,
    width: width * 0.8,
    padding: 12,
    marginTop: 15,
  },
  forgot: {
    alignSelf: "flex-start",
    color: "#777",
    marginTop: 10,
    marginLeft: 23,
  },
  button: {
    backgroundColor: "#F0C0BE",
    padding: 15,
    borderRadius: 30,
    marginTop: 20,
    width: width * 0.8,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 16 },
  create: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "medium",
    marginBottom: 10,
  },
  help: {
    color: "#1C1825",
    textDecorationLine: "underline",
    marginTop: 5,
    fontSize: 12,
    fontWeight: "medium",
  },
  exclusive: {
    marginTop: 40,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    color: "#1C1825",
  },
  footer: {
    width: 300,
    textAlign: "center",
    marginTop: 10,
    fontWeight: "regular",
    fontSize: 14,
    color: "#1C1825",
  },
});

export default LoginScreen;
