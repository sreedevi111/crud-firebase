import {View, TextInput, Button, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-simple-toast';
// import ModalCategory from '../../../Components/ModalCategory';
import DropDownPicker from 'react-native-dropdown-picker';
import Moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-action-sheet';
import _ from 'lodash'
import AntDesign from 'react-native-vector-icons/AntDesign';
import storage from '@react-native-firebase/storage'; // for storage

//redux hooks
import {useSelector, useDispatch} from 'react-redux';

//redux action
import { editpost, getpost } from '../../../Redux/Actions/postAction';


// const EditScreen = ({navigation, route}) => {
//   const state = useSelector(state=>state.post)
//

const EditScreen = ({navigation, route}) => {
  const dispatch = useDispatch();

  console.log("Route in editscreen:::", route.params)
  const [state, setState] = useState({
    Title: route.params.Title,
    Name: route.params.Name,
    Email: route.params.Email,
    Description: route.params.Description,
    Phone: route.params.Phone,
    Image: typeof route.params.Image !== 'undefined' ? route.params.Image: null ,
    id: route.params.id
  });

  console.log('state',state)

  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);


  const [openPicker, set_openPicker] = useState(false); // status of dropdownload status = false, status = true
  const [valuePicker, set_valuePicker] = useState(route.params.catID); //to store select option of dropdown
  const itemsPicker = useSelector(state => state.category.newscategories)

//Image selection

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


var catName = _.filter(itemsPicker, each => {
  return each.value == valuePicker;
});


const ImageAddition = async documentID => {
  console.log('Yes selected image has path');
  var extension = '';
  //const res = dispatch(addpost);
  //console.log('RESPONSE IN IMAGE ADDITION', res);
  if (selectedImage.mime === 'image/jpeg') {
    extension = 'jpg';
  } else if (selectedImage.mime === 'image/png') {
    extension = 'png';
  }
  let imagename = `${documentID}.${extension}`; //97Df0E8yksbRJhpWhlwd.jpg
  await storage().ref(imagename).putFile(selectedImage.path);
  var url = await storage().ref(imagename).getDownloadURL();
  await firestore()
    .collection('Contacts')
    .doc(documentID)
    .set({Image: url}, {merge: true});
  setLoading(false);
  Toast.show('Image updated successfully!!!');
  dispatch(getpost());
  //pushNotification();
  navigation.navigate('Home');
};


  // submit
  const submit = () => {
    if (selectedImage?.path) {
      ImageAddition(state.id);
    }
    dispatch(editpost({catID: valuePicker, catName:  catName[0].label, timeUpdated: Moment().unix(),  time_updated: Moment().format('h:mm:ss a'), timeinHuman_updated: Moment().format('DD-MM-YYYY'), ...state}))
    if(selectedImage === null){
      dispatch(getpost());
      //pushNotification();
      navigation.navigate('Home');
    }
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
    <ScrollView style={styles.container}>
      <TextInput
        placeholderTextColor={'grey'}
        placeholder="Title"
        value={state.Title}
        multiline={true}
        onChangeText={Title => setState(prev => ({...prev, Title:Title}))}
        style={styles.title}
      />
      <TextInput
        placeholderTextColor={'grey'}
        placeholder="Name"
        value={state.Name}
        onChangeText={Name => setState(prev => ({...prev, Name:Name}))}
        style={styles.name}
      />
      <TextInput
        placeholderTextColor={'grey'}
        placeholder="Description"
        multiline={true}
        numberOfLines={5}
        value={state.Description}
        onChangeText={Description => setState(prev => ({...prev, Description: Description}))}
        style={styles.name}
      />
      <TextInput
        placeholderTextColor={'grey'}
        placeholder="Phone"
        keyboardType="numeric"
        value={state.Phone}
        onChangeText={Phone => setState(prev => ({...prev, Phone:Phone}))}
        style={styles.name}
      />


      <DropDownPicker
        style={{marginBottom: 10}}
        open={openPicker}
        value={valuePicker}
        items={itemsPicker}
        setOpen={set_openPicker}
        setValue={set_valuePicker}
      />

      <View>
        <Text style={{color: 'black', left: 50}}>Edit Image &#128247;</Text>

        <TouchableOpacity style={styles.imagePicker} onPress={openActionSheet}>
              <Image source={{uri: selectedImage !== null ?  selectedImage.path : state.Image !== null ? state.Image : ''}} style={styles.imagePicker} />
              {selectedImage !== null && (
                <TouchableOpacity onPress={()=>setSelectedImage(null)} style={{ backgroundColor: 'white', width: 30, height: 30, justifyContent: 'center', alignItems: 'center', position: 'absolute', zIndex: 999, right: 2, top: 2 }}>
                  <AntDesign name="delete" color="red" size={18} />
                </TouchableOpacity>
              )}
        </TouchableOpacity>
      </View>

      <Button onPress={submit} title="Submit" />

        <View style={{ height: 100 }} />

    </ScrollView>
  );
};

export default EditScreen;