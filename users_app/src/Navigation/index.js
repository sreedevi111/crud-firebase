import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../Screens/AfterLogin/HomeScreen';
import DetailScreen from '../Screens/AfterLogin/DetailScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {

    
  return (
  <SafeAreaView style={styles.container}>
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeScreen}/>
            <Stack.Screen name='Detail' component={DetailScreen}/>      
        </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaView>
  )
}

export default Navigation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
      }
})