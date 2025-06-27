import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
import { apiCall } from '../../config/api';
import { useAuth } from '../../hooks/AuthContext';

const { width } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);

    // ✅ No token passed for login call (as it should be)
    const response = await apiCall('/user/login', 'POST', { email, password });

    setLoading(false);

    if (response.status === 201) {
      await login(response.data.user, response.data.token);
      navigation.replace('Home');
    } else if (response.status === 400) {
      Alert.alert('Error', 'Wrong credentials');
    } else if (response.status === 200) {
      Alert.alert('Error', 'An error occurred');
    } else {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
    
      <Image
        source={require('../../assets/images/Group 1.png')}
        style={{ width: 70, height: 70, marginBottom:30 }}
      />
      <Text style={styles.text}>Welcome Back To</Text>
      <Text style={styles.text}>Good Breach!</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity 
        style={[styles.logBtn, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>Sign In</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.linkButton}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.linkText}>
          Don't have an account? <Text style={styles.linkTextBold}>Sign Up</Text>
        </Text>
      </TouchableOpacity>

    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#1C1825",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Ouicksand",
  },
  input: {
    backgroundColor: "#FFEAE9",
    borderRadius: 10,
    width: width * 0.8,
    padding: 12,
    marginTop: 15,
  },
  spacer: {
    height: 12,
  },
  logBtn: {
    backgroundColor: "#F0C0BE",
    padding: 15,
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 20,
    width: width * 0.8,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 16 },
  button: {
    marginTop: 15,
    flexDirection: 'row',
    backgroundColor: '#FFEAE9',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 9999,
    width: 346,
  },
  linkText: {
    color: '#1C1825',
    fontSize: 16,
    fontWeight: 'medium',
  },
  linkTextBold: {
    fontWeight: "bold"
  }
});
