import { StyleSheet, Text, View, Dimensions} from 'react-native';
import LottieView from "lottie-react-native";
import { useRef, useEffect } from "react";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
     const animation = useRef(null);
  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    // animation.current?.play();
  }, []);
  return (
    
    <View style={styles.container}>
      <LottieView
        autoPlay
        ref={animation}
        style={styles.lottie}
       
        source={require('../assets/animation/Animation - 1748976949654.json')}
      />
      <Text style={styles.text}>After 17years finally Royal Challengers Bengaluru won their first TATA IPL Trophy in the captancy of Rajat Patidarr</Text>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
   lottie: {
    width: width * 0.9,
    height: width,
  },
  text:{
    width:290,
    fontSize: 22,
    fontWeight:"medium",
        color: "#A0A0A0",
        textAlign: "center",
        lineHeight: 30,
  }
});