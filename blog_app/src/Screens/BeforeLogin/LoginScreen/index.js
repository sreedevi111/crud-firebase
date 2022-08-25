import {Text, TextInput, View, TouchableOpacity, Pressable, Modal} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginScreen = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
    passwordHidden: false,
    loader: false,
    emailTestFail: null,
    passwordTestFail: null,
  });

  const[modalVisible, setModalVisible] = useState(false)

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
    console.log(pattern.test(state.email));
    setState(prev => ({...prev, emailTestFail: !pattern.test(state.email)}));
  };

  const validPassword = () => {
    console.log('state.password value is', state.password);
    var pass = String(state.password).trim();
    console.log('pass', pass, pass.length, !pass.length > 6);
    setState(prev => ({...prev, passwordTestFail: !(pass.length > 6)}));
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.LoginText}>Login</Text>
        <Text style={styles.conditionText}>
          By signing in you are agreeing {'\n'} our
          <Text style={{color: 'blue'}}   onPress={() => setModalVisible(true)}> Term and privacy policy</Text>
        </Text>

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

{state.passwordTestFail === false && (
    <Text style={styles.error_msg}> Invalid Password</Text>
)}

        </View>


        <TouchableOpacity style={styles.submit_button}>
          <Text style={styles.login_button}>Login</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoginScreen;
