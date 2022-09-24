import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, {useEffect} from 'react'
import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../Screens/AfterLogin/HomeScreen';
import DetailScreen from '../Screens/AfterLogin/DetailScreen';
import messaging from '@react-native-firebase/messaging';


const Stack = createNativeStackNavigator();

const Navigation = () => {

  useEffect(()=>{
    getRequest();
    // Foreground state messages
    const unsubscribe = messaging().onMessage(async remoteMessage =>{
      Alert.alert("A new FCM message arrived", JSON.stringify(remoteMessage))
    })
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });


  })

  const getRequest = async() =>{
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
      getToken()
    }
  
  }

  const getToken = () => {
    messaging().getToken().then(token =>{
      console.log("Token for notification::", token)
    })
    .catch(e =>{
      console.log("Error to display notification::", e)
    })
    messaging().subscribeToTopic('customers')
    .then(()=> {
        console.log('subscribeed to topic customers')
    })
  }

    
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