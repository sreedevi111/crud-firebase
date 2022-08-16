import {
  View,
  TextInput,
  Button,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-simple-toast';

const EditScreen = ({navigation, route}) => {
  console.log('Route of edit:', route);
  const [state, setState] = useState({
    Title: route.params.Title,
    Name: route.params.Name,
    Email: route.params.Email,
    Phone: route.params.Phone,
  });

  const submit = () => {
    console.log('triggered');
    firestore()
      .collection('Contacts')
      .doc(route.params.id)
      .update({
        Title: state.Title,
        Name: state.Name,
        Email: state.Email,
        Phone: state.Phone,
      })
      .then(res => {
        console.log('Data entered', res);
        Toast.show('Item added successfully!');
        route.params.reload();
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log('Error occured', error);
        Toast.show('OOPS!!');
      });
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

export default EditScreen;
