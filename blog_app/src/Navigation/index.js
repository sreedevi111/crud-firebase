import {StyleSheet, SafeAreaView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Screens/AfterLogin/HomeScreen';
import DetailScreen from '../Screens/AfterLogin/DetailScreen';
import EditScreen from '../Screens/AfterLogin/EditScreen';
import AddPostScreen from '../Screens/AfterLogin/AddPostScreen';
// import LandingScreen from '../Screens/BeforeLogin/LandingScreen';
import LoginScreen from '../Screens/BeforeLogin/LoginScreen';
import SplashScreen from '../Screens/BeforeLogin/SplashScreen';
import auth from '@react-native-firebase/auth';
import CategoryScreen from '../Screens/AfterLogin/CategoryScreen';
import EditCategory from '../Screens/AfterLogin/EditCategory';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [state, setState] = useState({loading: true, currentUser: null});


  useEffect(() => {
    auth().onAuthStateChanged((user) => {
        if (user) {
          var uid = user.uid;
          console.log('uid onAuthStateChanged',uid)
            setState(prev => ({...prev, currentUser: uid, loading: false }))
        } else {
          console.log('user is signout')
            setState(prev => ({...prev, currentUser: null, loading: false }))
        }
      });

  }, []);

  const loginPage = () =>{
    const currentUser = auth().currentUser;
    console.log('Current user on navigation page :::', currentUser);
    setState(prev => ({...prev, currentUser: currentUser, loading: false}));
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.currentUser === null ? (
            <>
              {/* <Stack.Screen
                options={{headerShown: false}}
                name="Landing"
                component={LandingScreen}
              /> */}

              <Stack.Screen 
              options={{headerShown: false}}
              name='Splash'
              component={SplashScreen}
              />

              <Stack.Screen
                options={{headerShown: false}}
                name="Login"
                component={LoginScreen}
              />
            </>
          ) : (
            <>
              <Stack.Screen  options={{headerShown: false}} name="Home" component={HomeScreen} />
              <Stack.Screen  options={{headerShown: false}} name="Category" component={CategoryScreen} />
              <Stack.Screen  options={{headerShown: false}} name="EditCategory" component={EditCategory} />
              <Stack.Screen name="Detail" component={DetailScreen} />
              <Stack.Screen name="Edit" component={EditScreen} />
              <Stack.Screen name="Add" component={AddPostScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});
