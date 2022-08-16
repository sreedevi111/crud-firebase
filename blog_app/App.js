import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/Screens/AfterLogin/HomeScreen';
import DetailScreen from './src/Screens/AfterLogin/DetailScreen';
import EditScreen from './src/Screens/AfterLogin/EditScreen';
import AddPostScreen from './src/Screens/AfterLogin/AddPostScreen';
import LandingScreen from './src/Screens/AfterLogin/LandingScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen name="Edit" component={EditScreen} />
          <Stack.Screen name="Add" component={AddPostScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});
