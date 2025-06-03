import React, { useEffect, useState } from "react";
import { View, StatusBar } from "react-native";
import SplashScreen from "./screens/SplashScreen";
import AppNavigation from "./navigation/AppNavigation";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FADADD" />
      {showSplash ? <SplashScreen /> : <AppNavigation />}
    </View>
  );
}