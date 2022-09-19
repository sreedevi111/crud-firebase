import {
  View,
  TextInput,
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
import ModalCategory from '../../../Components/ModalCategory';
import axios from 'axios';

import {API_URL} from '@env';

const AddPostScreen = ({navigation}) => {
  const [state, setState] = useState({
    Title: '',
    Name: '',
    Email: '',
    Phone: '',
    Image: '',
    Category: '',
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  
  //To select image
  useEffect(() => {}, []);
  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
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



// submit fuction
  const submit = async () => {
    if (String(state.Title).length < 3) {
      Toast.show('Title should contain min 4 characters');
    }
    setLoading(true);
    await addContactDatatoFirestore();
  };



  const addContactDatatoFirestore = async () => {
    var imagename = '';
    try {
      var res = await firestore().collection('Contacts').add({
        Title: state.Title,
        Name: state.Name,
        Email: state.Email,
        Phone: state.Phone,
        Category: selectedCategory,
      });
      if (res) {
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

          //For push notification
          const response = axios.post(
            `${API_URL}/sendPushToTopic`,
            {
              topic: 'customers',
              Title: state.Title,
              Name: state.Name,
            }
              .then(status => {
                console.log('status::', status);
              })
              .catch(e => {
                console.log('error::', e);
              }),
          );
          // } else {
          //   setLoading(false);
          //   Toast.show('Uploaded successfully!!!');

          // }
          route.params.reloadData();
          setTimeout(() => {
            navigation.navigate('Home');
          }, 1500);
        } else {
          setLoading(false);
          Toast.show('Uploaded Successfully');
          route.params.reloadData();
          navigation.navigate('Home');
        }
      }
    } catch (error) {
      console.log('Image failed to upload', error);
      // Toast.show('Image failed to upload');
    }
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

  // For Modal category
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState({data: []});
  const [selectedCategory, setSelectedCategory] = useState({
    name: 'Select Category',
    id: null,
  });

  useEffect(() => {
    SelectCategories(category);
  }, []);

  const onSelectItem = item => {
    setSelectedCategory(item);
    console.log('selected Category::', item);
    toggleModal();
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const SelectCategories = () => {
    firestore()
      .collection('Categories')
      .get()
      .then(response => {
        var categorylist = [];
        console.log('response check::::::', response.docs);
        response.docs.map(each => {
          categorylist.push({...each.data(), id: each.id});
        });
        console.log('Category List::', categorylist);
        setCategory(prev => ({...prev, data: categorylist}));
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const renderItem = ({item}) => {
    console.log('Item inrender Item::', item);
    return (
      <View style={{backgroundColor: 'white'}}>
        <TouchableOpacity
          onPress={() => onSelectItem(item)}
          style={{height: 60}}>
          <Text
            style={{
              color: 'black',
              padding: 10,
              fontSize: 16,
              marginLeft: 30,
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
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

      <TouchableOpacity
        style={styles.categorySelection}
        onPress={() => {
          toggleModal();
          console.log('::', modalVisible);
        }}>
        <Text style={styles.categorySelectionText}>
          {selectedCategory.name}
        </Text>
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

      <ModalCategory
        visible={modalVisible}
        setModalVisible={setModalVisible}
        data={category.data}
        renderItem={renderItem}
      />
    </View>
  );
};

export default AddPostScreen;
