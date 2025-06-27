// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Image,
//   Alert,
//   Dimensions
// } from 'react-native';
// import { useAuth } from '../../hooks/AuthContext';

// const{width} = Dimensions.get('window')

// const Profile = ({ navigation }) => {
//   const { user, logout } = useAuth();

//   const handleLogout = () => {
//     Alert.alert(
//       'Logout',
//       'Are you sure you want to logout?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { 
//           text: 'Logout', 
//           style: 'destructive',
//           onPress: async () => {
//             await logout();
//             navigation.replace('Login');
//           }
//         }
//       ]
//     );
//   };

//   return (
//      <ScrollView
//      style={{ flex: 1 }}
//      contentContainerStyle={styles.container}>
//         <View style={styles.profileHeader}>
//           {user?.imageUrl ? (
//             <Image source={{ uri: user.imageUrl }} style={styles.profileImageLarge} />
//           ) : (
//             <View style={styles.profilePlaceholderLarge}>
//               <Text style={styles.profileInitialLarge}>
//                 {user?.fullName?.charAt(0) || 'U'}
//               </Text>
//             </View>
//           )}
//           <Text style={styles.profileName}>{user?.fullName || 'User'}</Text>
//         </View>

//         <View style={styles.infoSection}>
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Email</Text>
//             <Text style={styles.infoValue}>{user?.email || 'N/A'}</Text>
//           </View>
          
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Phone</Text>
//             <Text style={styles.infoValue}>{user?.phone || 'N/A'}</Text>
//           </View>
          
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Age Range</Text>
//             <Text style={styles.infoValue}>{user?.ageRange || 'N/A'}</Text>
//           </View>
          
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Date of Birth</Text>
//             <Text style={styles.infoValue}>{user?.dob || 'N/A'}</Text>
//           </View>
          
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Student Status</Text>
//             <Text style={styles.infoValue}>{user?.isStudent ? 'Student' : 'Not a Student'}</Text>
//           </View>
//         </View>

//         <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//           <Text style={styles.logoutButtonText}>Logout</Text>
//         </TouchableOpacity>
//     </ScrollView>
//   );
// };

// export default Profile;

// const styles = StyleSheet.create({
//      container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
    
//   },

//   // Header Section
//   profileHeader: {
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   profileImageLarge: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 10,
//   },
//   profilePlaceholderLarge: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: '#F0C0BE',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   profileInitialLarge: {
//     fontSize: 36,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   profileName: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#1C1825',
//   },

//   // Info Section
//   infoSection: {
//     backgroundColor: '#f9f9f9',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 30,
//     elevation: 1, // Android shadow
//     shadowColor: '#000', // iOS shadow
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//   },
//   infoRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 14,
//   },
//   infoLabel: {
//     fontSize: 14,
//     color: '#777',
//     fontWeight: '500',
//   },
//   infoValue: {
//     fontSize: 14,
//     color: '#1C1825',
//     fontWeight: '600',
//     textAlign: 'right',
//     maxWidth: '60%',
//   },

//   // Logout Button
//   logoutButton: {
//     backgroundColor: '#F87171',
//     paddingVertical: 14,
//     borderRadius: 30,
//     alignItems: 'center',
//     width: width * 0.8,
//     alignSelf: 'center',
//   },
//   logoutButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },

// })

import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { getFromStorage, clearStorage } from '../../utils/Storage';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const [user, setUser] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const storedUser = await getFromStorage('user');
      setUser(storedUser);
    })();
  }, []);

  const handleLogout = async () => {
    await clearStorage();
    navigation.navigate('Login');
  };

  return (
    <View>
      <Image source={{ uri: user.imageUrl }} style={{ width: 100, height: 100 }} />
      <Text>Name: {user.fullName}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Phone: {user.phone}</Text>
      <Text>Age: {user.ageRange}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default ProfileScreen;
