import {
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Text,
  Platform,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';
import firestore from '@react-native-firebase/firestore'; //for db
import storage from '@react-native-firebase/storage'; // for storage
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-action-sheet';
import Toast from 'react-native-simple-toast';
import ModalCategory from '../../../Components/ModalCategory';
import axios from 'axios';

const API_URL = 'https://us-central1-crud-app-3cd08.cloudfunctions.net';

const AddPostScreen = ({navigation}) => {
  const [state, setState] = useState({
    Title: '',
    Name: '',
    Email: '',
    Phone: '',
    Image: '',
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  const submit = async () => {
    if (String(state.Title).length < 3) {
      Toast.show('Title should contain min 4 characters');
    }

    setLoading(true);
    await addDatatoFirestore();
  };

  const addContactDatatoFirestore = async () => {
    // var tmpID = null;
    var imagename = '';
    try {
      var res = await firestore().collection('Contacts').add({
        Title: state.Title,
        Name: state.Name,
        Email: state.Email,
        Phone: state.Phone,
      });
      if (res) {
        //  console.log("Selected image path", selectedImage.path)
        // if(selectedImage !== null && typeof selectedImage.path !== undefined){
        if (selectedImage?.path) {
          var extension = '';
          if (selectedImage.mime === 'image/jpeg') {
            extension = 'jpg';
          } else if (selectedImage.mime === 'image/png') {
            extension = 'png';
          }
          imagename = `${res.id}.${extension}`;
          await storage().ref('sample.jpeg').putFile(selectedImage.path);
          var url = await storage().ref('sample.jpeg').getDownloadURL();
          await firestore()
            .collection('Contacts')
            .doc(res.id)
            .update({Image: url});
          setLoading(false);
          Toast.show('Image updated successfully!!!');
axios.post(`${ API_URL}/sendPushToTopic`,{
  topic: 'customers',
  Title: state.Title,
  Name: state.Name,

}
.then(status=>{
  console.log('status::', status )
})
.catch(e=> {
  console.log('error::', e)
})
)

        } else {
          setLoading(false);
          Toast.show('Image updated successfully!!!');
        }
      }
    } catch (error) {
      console.log('Image failed to upload', error);
      Toast.show('Image failed to upload');
    }
  };


  const addCategoryDataToFirestore  = async() =>{
 dataCategory = [];
 try{
  const snapShot =await firestore().collection('Categories').get()
  if(snapShot){
          console.log('doc',snapShot.size)
          snapShot.docs.map(each => {
                     dataArray.push({...each.data(), id: each.id});
           });
            setData(dataArray);
        }
 }
 catch{

 }

  }

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
      {loading && <ActivityIndicator animating size={'large'} />}

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

      <TouchableOpacity
        style={styles.categorySelection}
        onPress={() => {
          setModalVisible(true);
          console.log('::', modalVisible);
        }}>
        <Text style={styles.categorySelectionText}>Select Category</Text>
      </TouchableOpacity>

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
