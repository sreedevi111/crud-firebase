import {View, TextInput, Button, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-simple-toast';
// import ModalCategory from '../../../Components/ModalCategory';
import DropDownPicker from 'react-native-dropdown-picker';
import Moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-action-sheet';

//redux hooks
import {useSelector, useDispatch} from 'react-redux';

//redux action
import { editpost } from '../../../Redux/Actions/postAction';


const EditScreen = ({navigation, route}) => {
  console.log('Route of edit:', route.params);
  const [state, setState] = useState({
    Title: route.params.Title,
    Name: route.params.Name,
    Description: route.params.Description,
    Phone: route.params.Phone,
    Image: route.params.Image
  });
//Image selection

const openCamera = () => {
  ImagePicker.openCamera({
    width: 300,
    height: 400,
  })
    .then(image => {
      console.log(image);
      setState(prev => ({...prev, image}))
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
      setState(prev => ({...prev, image}))
    })
    .catch(error => {
      console.log('Error in catching image', error);
    });
};



  // submit
  const submit = () => {
    console.log('triggered');
    firestore()
      .collection('Contacts')
      .doc(route.params.id)
      .update({
        Title: state.Title,
        Name: state.Name,
        Description: state.Description,
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

  //Function to select image from camera or gallery
  const openActionSheet = () => {
    var BUTTONSiOS = ['Camera', 'CameraRoll', 'Cancel'];

    var BUTTONSandroid = ['Camera', 'ImageGallery', 'Cancel'];

    var CANCEL_INDEX = 2;

    ActionSheet.showActionSheetWithOptions(
      {
        options: Platform.OS == 'ios' ? BUTTONSiOS : BUTTONSandroid,
        cancelButtonIndex: CANCEL_INDEX,
        tintColor: 'blue',
      },
      buttonIndex => {
        console.log('button clicked :', buttonIndex);
        if (buttonIndex == 0) {
          openCamera();
        } else if (buttonIndex == 1) {
          openGallery();
        }
      },
    );
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
        placeholder="Description"
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

      <View>
        <Text style={{color: 'black', left: 50}}>Edit Image &#128247;</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={openActionSheet}>
          
        </TouchableOpacity>
      </View>

      <Button onPress={submit} title="Submit" />
    </View>
  );
};

export default EditScreen;
