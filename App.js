import React, { useEffect, useState } from "react";
import { View, StatusBar, Text } from "react-native";
import SplashScreen from "./screens/SplashScreen";
import AppNavigation from "./navigation/AppNavigation";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    if (error) {
      return <Text style={{ padding: 20, color: "red" }}>App crashed: {error.toString()}</Text>;
    }
    return showSplash ? <SplashScreen /> : <AppNavigation />;
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FADADD" />
      {renderContent()}
    </View>
  );
}
