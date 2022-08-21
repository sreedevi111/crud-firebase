import {
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Text,
  Platform,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';
import firestore from '@react-native-firebase/firestore'; //for db
import storage from '@react-native-firebase/storage'; // for storage
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-action-sheet';
import Toast from 'react-native-simple-toast';

const AddPostScreen = ({navigation}) => {
  const [state, setState] = useState({
    Title: '',
    Name: '',
    Email: '',
    Phone: '',
    Image: '',
  });
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {}, []);

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      // cropping: true,
    })
      .then(image => {
        console.log(image);
        setSelectedImage(image);
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
        setSelectedImage(image);
      })
      .catch(error => {
        console.log('Error in catching image', error);
      });
  };

  const submit = () => {
    if (String(state.Title).length < 3) {
      Toast.show('Title should contain min 4 characters');
    }

    var tmpID = null;
    var imagename = '';
    firestore()
      .collection('Contacts')
      .add({
        Title: state.Title,
        Name: state.Name,
        Email: state.Email,
        Phone: state.Phone,
      })
      .then(res => {
        console.log('Step1: res:', res.id);
        tmpID = res.id;
        var extension = '';
        if (selectedImage.mime === 'image/jpeg') {
          extension = 'jpg';
        } else if (selectedImage.mime === 'image/png') {
          extension = 'png';
        }

        imagename = `${tmpID}.${extension}`;
        console.log('Image name:', imagename);

        return storage().ref('sample.jpeg').putFile(selectedImage.path);
      })
      .then(uploadedFile => {
        return storage().ref('sample.jpeg').getDownloadURL();
      })
      .then(url => {
        console.log('Url image:', url);
        firestore().collection('Contacts').doc(tmpID).update({Image: url});
      })
      .then(() => {
        console.log('Whole Process is done');
        Toast.show('Post updated successfully!!');
      })
      .catch(error => {
        console.log('Error of image: ', error);
      });
    // console.log('triggered');
    // firestore()
    //   .collection('Contacts')
    //   .add({
    //     Title: state.Title,
    //     Name: state.Name,
    //     Email: state.Email,
    //     Phone: state.Phone,
    //     Image: state.Image,
    //     // Image:
    //     //   'https://firebasestorage.googleapis.com/v0/b/crud-app-3cd08.appspot.com/o/hd-photo.jpeg?alt=media&token=f3d34a9e-3791-44ef-8754-ade36234fa9a',
    //   })
    //   .then(res => {
    //     console.log('Data entered', res);
    //     console.log('Data entered response id', res.id);
    //     console.log(' Checking selected image ', selectedImage);
    //     console.log(' Checking selected image path ', selectedImage.path);

    //     // storage().ref('sample.jpeg').putFile(selectedImage.path);
    //     navigation.navigate('Home');
    //   })
    //   .catch(error => {
    //     console.log('Error occured', error);
    //   });
  };

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
        <Text style={{color: 'black', zIndex: 0}}>
          Upload an Image &#128247;
        </Text>
        {selectedImage != null && (
          <Image
            source={{uri: selectedImage.path}}
            style={styles.imageUpload}
          />
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={submit}>
        <Text>Submit</Text>
      </TouchableOpacity>

      {/* <Button style={{borderRadius: 20}} onPress={submit} title="Submit" /> */}
    </View>
  );
};

export default AddPostScreen;
