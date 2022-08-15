import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';
import firestore from '@react-native-firebase/firestore'

const AddPostScreen = () => {
  const [state, setState] = useState({
    Title: '',
    Name: '',
    Email: '',
    Phone: '',
  });

  const submit = () => {
    console.log('triggered');
    firestore().collection('Contacts').add({Title: state.Title, Name: state.Name, Email:state.Email, Phone:state.Phone})
    .then(res =>{
        console.log('Data entered', res);
    })
    .catch(error =>{
        console.log('Error occured', error);
    })
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor={'grey'}
        placeholder="Title"
        value={state.Title}
        onChangeText={Title => setState(prev => ({...prev, Title}))}
        style={styles.title}
      />
      <TextInput
        placeholderTextColor={'grey'}
        placeholder="Name"
        value={state.Name}
        onChangeText={Name => setState(prev => ({...prev, Name}))}
        style={styles.name}
      />
      <TextInput
        placeholderTextColor={'grey'}
        placeholder="Email"
        value={state.Email}
        onChangeText={Email => setState(prev => ({...prev, Email}))}
        style={styles.name}
      />
      <TextInput
        placeholderTextColor={'grey'}
        placeholder="Phone"
        keyboardType="numeric"
        value={state.Phone}
        onChangeText={Phone => setState(prev => ({...prev, Phone}))}
        style={styles.name}
      />

      <Button onPress={submit} title="Submit" />
    </View>
  );
};

export default AddPostScreen;
