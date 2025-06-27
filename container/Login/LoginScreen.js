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

  try {
    const response = await apiCall('/user/login', 'POST', { email, password });
    console.log('Login API response:', response);

    setLoading(false);

    const responseData = response.data?.data;

    if (response.status === 201 && responseData?.token) {
      const { token, ...userData } = responseData;
      await login(userData, token);
      navigation.replace('Home');
    } else if (response.status === 400) {
      Alert.alert('Error', 'Wrong credentials');
    } else {
      Alert.alert('Error', 'Something went wrong');
      console.warn('Unexpected login response structure:', response);
    }
  } catch (err) {
    setLoading(false);
    console.error('Login error:', err);
    Alert.alert('Error', 'Network error or server issue');
  }
};


  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Image
        source={require('../../assets/images/Group 1.png')}
        style={{ width: 70, height: 70, marginBottom: 30 }}
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
    fontFamily: "Ouicksand", // Make sure this font is properly loaded or remove this line
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    backgroundColor: "#FFEAE9",
    borderRadius: 10,
    width: width * 0.8,
    padding: 12,
    marginTop: 15,
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
  buttonDisabled: {
    opacity: 0.6,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
  },
  linkButton: {
    marginTop: 10,
  },
  linkText: {
    color: '#1C1825',
    fontSize: 16,
    fontWeight: '400',
  },
  linkTextBold: {
    fontWeight: "bold",
  },
});
