import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { getFromStorage, clearStorage } from "../../utils/Storage";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const Profile = () => {
  const [user, setUser] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const storedUser = await getFromStorage("user");
      setUser(storedUser);
    })();
  }, []);

  const handleLogout = async () => {
    await clearStorage();
    navigation.navigate("Login");
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: user.imageUrl }}
          style={{ width: 150, height: 150, borderRadius: 80 }}
        />
        <Text style={styles.profileName}>{user.fullName || "User"}</Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{user.email || "N/A"}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Phone</Text>
          <Text style={styles.infoValue}>{user.phone || "N/A"}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Age Range</Text>
          <Text style={styles.infoValue}>{user.ageRange || "N/A"}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Date of Birth</Text>
          <Text style={styles.infoValue}>
            {user?.dob ? new Date(user.dob).toISOString().split("T")[0] : "N/A"}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Student Status</Text>
          <Text style={styles.infoValue}>
            {user.isStudent ? "Student" : "Not a Student"}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  profileHeader: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileName:{
    color:"#1C0D0D",
    fontFamily:"Poppins",
    fontSize: 22,
    fontWeight: "700", 
    marginTop:10,
  },
  infoSection: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    width:width*0.8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  infoLabel: {
    fontSize: 14,
    color: "#777",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 14,
    color: "#1C1825",
    fontWeight: "600",
    textAlign: "right",
    maxWidth: "60%",
  },

  logoutButton: {
    backgroundColor: "#F87171",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    width: width * 0.8,
    alignSelf: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
