import {StyleSheet, SafeAreaView, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/AfterLogin/HomeScreen';
import DetailScreen from '../Screens/AfterLogin/DetailScreen';
import EditScreen from '../Screens/AfterLogin/EditScreen';
import AddPostScreen from '../Screens/AfterLogin/AddPostScreen';
import LoginScreen from '../Screens/BeforeLogin/LoginScreen';
import SplashScreen from '../Screens/BeforeLogin/SplashScreen';
import auth from '@react-native-firebase/auth';
import CategoryScreen from '../Screens/AfterLogin/CategoryScreen';
import EditCategory from '../Screens/AfterLogin/EditCategory';
import messaging from '@react-native-firebase/messaging';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import BookmarkScreen from '../Screens/AfterLogin/BookmarkScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  const [state, setState] = useState({loading: true, currentUser: null});

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        var uid = user.uid;
        console.log('uid onAuthStateChanged', uid);
        setState(prev => ({...prev, currentUser: uid, loading: false}));
      } else {
        console.log('user is signout');
        setState(prev => ({...prev, currentUser: null, loading: false}));
      }
    });
    getRequest();

    // Foreground state messages
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived', JSON.stringify(remoteMessage));
    });

    //Background or close
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  }, []);

  const getRequest = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      getToken();
    }
  };

  const getToken = () => {
    messaging()
      .getToken()
      .then(token => {
        console.log('Token for notification::', token);
      })
      .catch(e => {
        console.log('Error to display notification::', e);
      });

    //taxi > employees, drivers , customers // all
    messaging()
      .subscribeToTopic('customers')
      .then(() => {
        console.log('subscribeed to topic customers');
      });
  };

  const loginPage = () => {
    const currentUser = auth().currentUser;
    console.log('Current user on navigation page :::', currentUser);
    setState(prev => ({...prev, currentUser: currentUser, loading: false}));
  };

  const HomeTabs = () => {
    return (
      <Tab.Navigator
        screenOptions={{headerShown: false}}
        barStyle={{backgroundColor: 'black'}}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialIcon name="home" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          component={AddPostScreen}
          options={{
            tabBarIcon: () => (
              <MaterialIcon name="add-box" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Categories"
          component={CategoryScreen}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialIcon name="category" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Bookmark"
          component={BookmarkScreen}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialIcon name="bookmark" size={24} color="black" />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.currentUser === null ? (
            <>
              <Stack.Screen
                options={{headerShown: false}}
                name="Splash"
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
              <Stack.Screen
                options={{headerShown: false}}
                name="HomeTabs"
                component={HomeTabs}
              />
              <Stack.Screen
                options={{headerShown: false}}
                name="Category"
                component={CategoryScreen}
              />
              <Stack.Screen
                options={{headerShown: false}}
                name="EditCategory"
                component={EditCategory}
              />
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
