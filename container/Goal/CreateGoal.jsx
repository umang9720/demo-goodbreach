import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';
import { apiCall } from '../../config/api';
import { useAuth } from '../../hooks/AuthContext';

const { width } = Dimensions.get("window");


const CreateGoalScreen = ({ navigation }) => {
  const [goalName, setGoalName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [durationDate, setDurationDate] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, token } = useAuth();

  const goalTypes = [
    { type: 'trip', emoji: '🧳', label: 'Trip' },
    { type: 'laptop', emoji: '💻', label: 'Laptop' },
    { type: 'college fee', emoji: '🎓', label: 'College Fee' },
    { type: 'game', emoji: '🎮', label: 'Game' },
    { type: 'future savings', emoji: '💰', label: 'Future Savings' },
    { type: 'emergency funds', emoji: '🛡️', label: 'Emergency Funds' },
    { type: 'electronics', emoji: '📱', label: 'Electronics' },
    { type: 'accessories', emoji: '👜', label: 'Accessories' },
  ];

  const handleCreateGoal = async () => {
    if (!goalName || !goalAmount || !durationDate || !selectedType) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!user || !token) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    const goalData = {
      userId: user.id,
      goalImage: goalTypes.find(g => g.type === selectedType)?.emoji || '🎯',
      goalName,
      goalAmount: parseFloat(goalAmount),
      durationDate,
    };

    setLoading(true);
    const response = await apiCall('/create/goal', 'POST', goalData, token);
    setLoading(false);

    if (response.status === 200) {
      Alert.alert('Success', 'Goal created successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } else {
      Alert.alert('Error', 'Failed to create goal');
    }
  };

  return (
    <ScrollView  style={{ flex: 1 }}
  contentContainerStyle={styles.container}>
     
        <Text style={styles.title}>Create New Goal</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Goal Name"
            value={goalName}
            onChangeText={setGoalName}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Goal Amount (£)"
            value={goalAmount}
            onChangeText={setGoalAmount}
            keyboardType="numeric"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Target Date (YYYY-MM-DD)"
            value={durationDate}
            onChangeText={setDurationDate}
          />
        </View>

        <Text style={styles.sectionTitle}>Goal Type</Text>
        <View style={styles.goalTypeContainer}>
          {goalTypes.map((goal) => (
            <TouchableOpacity
              key={goal.type}
              style={[
                styles.goalTypeButton,
                selectedType === goal.type && styles.goalTypeSelected
              ]}
              onPress={() => setSelectedType(goal.type)}
            >
              <Text style={styles.goalTypeEmoji}>{goal.emoji}</Text>
              <Text style={styles.goalTypeLabel}>{goal.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={[styles.logBtn, loading && styles.buttonDisabled]}
          onPress={handleCreateGoal}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Create Goal</Text>
          )}
        </TouchableOpacity>
    
    </ScrollView>
  );
};

export default CreateGoalScreen;

const styles = StyleSheet.create({
     container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  title:{
    color:"#1C1825",
    fontSize: 24,
    fontWeight:"bold",
    fontFamily:"Ouicksand",
  },
  input: {
    backgroundColor: "#FFEAE9",
    borderRadius: 10,
    width: width * 0.8,
    padding: 12,
    marginTop: 15,
  },
  sectionTitle:{
    color:"#121417",
    fontSize: 16,
    fontWeight:"500",
    fontFamily:"  Poppins",
    marginBottom:10,
    marginTop:10,
    alignSelf:"flex-start",
    marginLeft:50,
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
  goalTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 7,
    marginVertical: 10,
  },
  goalTypeButton: {
    backgroundColor: '#FFF0EC',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6,
    width: 100,
    height: 100,
    elevation: 2, // Android
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  goalTypeSelected: {
    backgroundColor: '#F0C0BE',
    borderWidth: 2,
    borderColor: '#FFA500',
  },
  goalTypeEmoji: {
    fontSize: 28,
    marginBottom: 6,
  },
  goalTypeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1825',
    textAlign: 'center',
  },

})
