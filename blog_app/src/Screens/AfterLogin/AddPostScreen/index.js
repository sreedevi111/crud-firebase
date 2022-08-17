import {View, TextInput, Button, TouchableOpacity, Text, Platform} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-action-sheet';

const AddPostScreen = ({navigation}) => {
  const [state, setState] = useState({
    Title: '',
    Name: '',
    Email: '',
    Phone: '',
  });

  useEffect(() => {}, []);

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log(image);
      })
      .catch(error => {
        console.log('Error in catching image', error);
      });
  };
  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log(image);
      })
      .catch(error => {
        console.log('Error in catching image', error);
      });
  };

  const submit = () => {
    console.log('triggered');
    firestore()
      .collection('Contacts')
      .add({
        Title: state.Title,
        Name: state.Name,
        Email: state.Email,
        Phone: state.Phone,
        Image:
          'https://firebasestorage.googleapis.com/v0/b/crud-app-3cd08.appspot.com/o/hd-photo.jpeg?alt=media&token=f3d34a9e-3791-44ef-8754-ade36234fa9a',
      })
      .then(res => {
        console.log('Data entered', res);
        state();
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log('Error occured', error);
      });
  };


const openActionSheet =() =>{
  var BUTTONSiOS = [
    'Camera',
    'CameraRoll',
    'Cancel'
  ];
   
  var BUTTONSandroid = [
    'Camera',
    'ImageGallery',
    'Cancel'
  
  ];
   
 
  var CANCEL_INDEX = 2;
   
  ActionSheet.showActionSheetWithOptions({
    options: (Platform.OS == 'ios') ? BUTTONSiOS : BUTTONSandroid,
    cancelButtonIndex: CANCEL_INDEX,
    tintColor: 'blue'
  },
  (buttonIndex) => {
    console.log('button clicked :', buttonIndex);
  });
  
}


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

      <TouchableOpacity style={styles.imagePicker} onPress={openActionSheet}>
        <Text style={{color: 'black'}}>Upload an Image &#128247;</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={submit}>
        <Text>Submit</Text>
      </TouchableOpacity>

      {/* <Button style={{borderRadius: 20}} onPress={submit} title="Submit" /> */}
    </View>
  );
};

export default AddPostScreen;
