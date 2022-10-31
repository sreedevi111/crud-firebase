import {Text, TextInput, View, TouchableOpacity, Button} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalView from '../../../Components/ModalView';
import auth from '@react-native-firebase/auth';
// import CheckBox from '@react-native-community/checkbox';
import Toast from 'react-native-simple-toast';
import * as storage from '../../../Services/AsyncStorageConfig';

import {
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {GoogleSignin} from '../../../Services/GoogleAuthConfigure';

const LoginScreen = () => {
  const [state, setState] = useState({
    email: __DEV__ ? 'sreedevi123@gmail.com' : '',
    password: __DEV__ ? '12345678' : '',
    passwordHidden: false,
    loader: false,
    emailTestFail: null,
    passwordTestFail: null,
  });

  const [userData, setUserData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const currentUser = auth().currentUser;
    console.log('currentUser>>>', currentUser);
    setCurrentUser(currentUser);
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState(false);

  const onChangeEmail = text => {
    setState(prev => ({...prev, email: text}));
  };

  const onChangePassword = text => {
    setState(prev => ({...prev, password: text}));
  };

  const validEmail = () => {
    console.log(
      'this line will trigger when we move from email to password field',
    );
    //    const pattern= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const pattern =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    console.log('Checking email pattern correct:', pattern.test(state.email));
    setState(prev => ({...prev, emailTestFail: !pattern.test(state.email)}));
  };

  const validPassword = () => {
    console.log('state.password value is', state.password);
    var pass = String(state.password).trim();
    console.log('pass', pass, pass.length, !pass.length > 6);
    setState(prev => ({...prev, passwordTestFail: !(pass.length > 6)}));
  };

  const submitForm = () => {
    const email = String(state.email).trim().toLowerCase();
    const pattern =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    var email_test = pattern.test(email);
    if (email_test === false) {
      setState(prev => ({...prev, emailTestFail: true}));
      return;
    }
    if (email_test === true) {
      setState(prev => ({...prev, emailTestFail: false}));
    }

    const password = String(state.password).trim();
    if (password.length < 6) {
      setState(prev => ({...prev, passwordTestFail: true}));
      return;
    }
    if (password.length >= 6) {
      setState(prev => ({...prev, passwordTestFail: false}));
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        console.log('Successfully logged in::', response);
        // console.log("uid::>>>>", auth().currentUser._user.uid);
        console.log('uid::', response.user.uid);
        var uid = response.user.uid;
        Toast.show('You are logged in successfully!!');
        storage.setItem('@uid', uid);
      })
      .catch(error => {
        console.log('Error to login::', error);
      });
  };

  const isGoogleSigned = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('UserInfo:::', userInfo);
      setUserData({userInfo});
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );

      //sign with credential in firebase
      auth()
        .signInWithCredential(googleCredential)
        .then(signedinUser => {
          setCurrentUser(signedinUser.user.uid);
        });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('user cancelled the login flow::', error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('operation (e.g. sign in) is in progress already::', error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('play services not available or outdated::', error);
      } else {
        // some other error happened
        console.log('Some other error to sign in::', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.LoginText}>Login</Text>

        <View style={styles.email_container}>
          <View>
            <Icon name="email-outline" color="grey" size={20} />
          </View>
          <View>
            <TextInput
              value={state.email}
              style={styles.email}
              placeholder={'Email Address'}
              placeholderTextColor={'grey'}
              onChangeText={text => onChangeEmail(text)}
              onBlur={validEmail}
            />
          </View>
        </View>
        {state.emailTestFail && (
          <Text style={styles.error_msg}>
            The input is not a valid email address
          </Text>
        )}

        <View style={styles.password_container}>
          <View>
            <Icon name="lock-outline" color="grey" size={20} />
          </View>
          <View style={{flex: 4}}>
            <TextInput
              value={state.password}
              style={styles.password}
              placeholder={'Password'}
              placeholderTextColor={'grey'}
              onChangeText={text => onChangePassword(text)}
              secureTextEntry={state.passwordHidden}
            />
          </View>
          <TouchableOpacity
            onPress={() =>
              setState(prev => ({
                ...prev,
                passwordHidden: !state.passwordHidden,
              }))
            }
            style={{flex: 1}}>
            <Icon
              name={state.passwordHidden ? 'eye' : 'eye-off'}
              size={13}
              color={'grey'}
            />
          </TouchableOpacity>

          {state.passwordTestFail === true && (
            <Text style={styles.error_msg}> Invalid Password</Text>
          )}
        </View>

        <View style={styles.checkboxContainer}>
          {/* <CheckBox
            value={selected}
            onValueChange={setSelected}
            boxType={'square'}
            tintColors={'black'}
            style={styles.checkbox}
          /> */}

          {/* <CheckBox boxType={'square'}   animationDuration={0}  tintColors={'black'} disabled={false} value={each.checked} onValueChange={(newValue) => setToggleCheckBox(each.value, newValue, false, subid  )} /> */}

          <Text style={styles.conditionText}>
            By signing in you are agreeing {'\n'} our
            <Text
              style={{color: 'blue'}}
              onPress={() => {
                console.log('jhfhkgjgvj');
                setModalVisible(true);
                console.log('::', modalVisible);
              }}>
              {' '}
              Term and privacy policy
            </Text>
          </Text>
        </View>

        <TouchableOpacity
          style={styles.submit_button}
          onPress={() => submitForm()}>
          <Text style={styles.login_button}>Login</Text>
        </TouchableOpacity>
      </View>
      <ModalView
        modalContent={'You are moving to privacy policy page'}
        visible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <View style={{alignItems: 'center', marginTop: 20}}>
        <Text style={{color: 'black'}}>OR</Text>
        {currentUser == null && (
          <GoogleSigninButton
            style={{width: 192, height: 48}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={isGoogleSigned}
            //disabled={this.state.isSigninInProgress}
          />
        )}
      </View>
    </View>
  );
};

export default LoginScreen;
