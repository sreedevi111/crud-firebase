import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';
// import LottieView = require("lottie-react-native");

const SplashScreen = ({navigation}) => {
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#ffffff'
  }}>
      <Lottie
        source={require('../../Assets/blog-splash.json')}
        autoPlay
        loop={false}
        speed={2}
        onAnimationFinish={() => {
          console.log('Animation Finished');
          navigation.navigate('Login');
        }}
      />
      
    </View>
  )
}

export default SplashScreen;

const styles = StyleSheet.create({});
