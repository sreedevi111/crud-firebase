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
import {editpost, getpost} from '../../../Redux/Actions/postAction';

const EditScreen = ({navigation, route}) => {
  console.log('Route in editscreen:::', route.params);
  const [state, setState] = useState({
    Title: route.params.Title,
    Name: route.params.Name,
    Email: route.params.Email,
    Description: route.params.Description,
    Phone: route.params.Phone,
    Image: route.params.Image,
    id: route.params.id,
  });

  // For dropdown
  const [openPicker, set_openPicker] = useState(false); // status of dropdownload status = false, status = true
  const [valuePicker, set_valuePicker] = useState(null); //to store select option of dropdown
  const [itemsPicker, set_itemsPicker] = useState([]);

  const categories = useSelector(state => state.category.newscategories);

  //Image selection

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
    })
      .then(image => {
        console.log(image);
        // setState(prev => ({...prev, image}))
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
        // setState(prev => ({...prev, image}))
      })
      .catch(error => {
        console.log('Error in catching image', error);
      });
  };

  var catName = _.filter(itemsPicker, each => {
    return each.value == valuePicker;
  });

  // submit
  const submit = () => {
    dispatch(editpost({...state}));
    dispatch(getpost());
    navigation.navigate('Home');
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
        multiline={true}
        onChangeText={Title => setState(prev => ({...prev, Title: Title}))}
        style={styles.title}
      />
      <TextInput
        placeholderTextColor={'grey'}
        placeholder="Name"
        value={state.Name}
        onChangeText={Name => setState(prev => ({...prev, Name: Name}))}
        style={styles.name}
      />
      <TextInput
        placeholderTextColor={'grey'}
        placeholder="Description"
        multiline={true}
        numberOfLines={5}
        value={state.Description}
        onChangeText={Description =>
          setState(prev => ({...prev, Description: Description}))
        }
        style={styles.name}
      />
      <TextInput
        placeholderTextColor={'grey'}
        placeholder="Phone"
        keyboardType="numeric"
        value={state.Phone}
        onChangeText={Phone => setState(prev => ({...prev, Phone: Phone}))}
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
        <TouchableOpacity
          style={styles.imagePicker}
          onPress={openActionSheet}></TouchableOpacity>
      </View>

      <Button onPress={submit} title="Submit" />
    </View>
  );
};

export default EditScreen;
