import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Platform,
  Image,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  LogBox,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';
import firestore from '@react-native-firebase/firestore'; //for db
import storage from '@react-native-firebase/storage'; // for storage
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-action-sheet';
import Toast from 'react-native-simple-toast';
// import ModalCategory from '../../../Components/ModalCategory';
import axios from 'axios';
import _ from 'lodash';
import DropDownPicker from 'react-native-dropdown-picker';
import Moment from 'moment';

//redux hooks
import {useSelector, useDispatch} from 'react-redux';
import {API_URL} from '@env';

//reducer
import {postReducer} from '../../../Redux/Reducers/postReducer';
import {STATECHANGE} from '../../../Redux/types';
import {
  addpost,
  statechangeaction,
  getpost,
  editpost,
} from '../../../Redux/Actions/postAction';
import {getcategories} from '../../../Redux/Actions/categoryAction';

const AddPostScreen = ({navigation}) => {
  const [postData, set_postData] = useState({
    Title: 'Hello Title',
    Description: 'Description',
    Name: 'NeilAmit',
    Phone: '12312312',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  // console.log("post::::: Addd", post)

  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // For dropdown
  const [openPicker, set_openPicker] = useState(false); // status of dropdownload status = false, status = true
  const [valuePicker, set_valuePicker] = useState(null); //to store select option of dropdown
  const [itemsPicker, set_itemsPicker] = useState([]);

  const categories = useSelector(state => state.category.newscategories);

  useEffect(() => {
    console.log('valuePicker', valuePicker);
  }, [valuePicker]);

  useEffect(() => {
    if (categories.length > 0) {
      console.log('categories', categories);
      set_itemsPicker([{label: 'Select Category', value: null}, ...categories]);
    }
  }, [categories]);

  //Function to select image from camera and gallery
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
    setLoading(true);
    let res = firestore().collection('Contacts').doc(); //blank unique ID
    console.log('res', res.id);
    if (selectedImage?.path) {
      ImageAddition(res.id);
    }

    let data = {
      ...postData,
      catName: catName[0].label,
      catID: valuePicker,
      timeCreated: Moment().unix(),
      time: Moment().format('h:mm:ss a'),
      timeinHuman: Moment().format('DD-MM-YYYY'),
      id: res.id,
    };
    console.log('data', data);
    dispatch(editpost(data));

    if (selectedImage == null) {
      dispatch(getpost());
      pushNotification();
    }
  };

  //For push notification
  const pushNotification = () => {
    axios
      .post(`${API_URL}/sendPushToTopic`, {
        topic: 'customers',
        Title: postData.Title,
        Name: postData.Name,
      })

      .then(status => {
        console.log('status::', status);
      })
      .catch(e => {
        console.log('error::', e);
      }),
      setTimeout(() => {
        navigation.navigate('Home');
      }, 1500);
  };

  var catName = _.filter(itemsPicker, each => {
    return each.value == valuePicker;
  });

  //Image adding
  const ImageAddition = async documentID => {
    console.log('Yes selected image has path');
    var extension = '';
    const res = dispatch(addpost);
    console.log('RESPONSE IN IMAGE ADDITION', res);
    if (selectedImage.mime === 'image/jpeg') {
      extension = 'jpg';
    } else if (selectedImage.mime === 'image/png') {
      extension = 'png';
    }
    let imagename = `${documentID}.${extension}`;
    await storage().ref('sample.jpeg').putFile(selectedImage.path);
    var url = await storage().ref('sample.jpeg').getDownloadURL();
    await firestore()
      .collection('Contacts')
      .doc(documentID)
      .set({Image: url}, {merge: true});
    setLoading(false);
    Toast.show('Image updated successfully!!!');
    dispatch(getpost());
    pushNotification();
  };

  //Function to opt Camera and Gallery
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
      <ScrollView>
        <TextInput
          placeholderTextColor={'grey'}
          placeholder="Title"
          value={postData.Title}
          onChangeText={text => set_postData(prev => ({...prev, Title: text}))}
          style={styles.title}
        />
        <TextInput
          placeholderTextColor={'grey'}
          placeholder="Description"
          value={postData.Description}
          onChangeText={text =>
            set_postData(prev => ({...prev, Description: text}))
          }
          style={styles.name}
        />
        <TextInput
          placeholderTextColor={'grey'}
          placeholder="Name"
          value={postData.Name}
          autoComplete={'off'}
          onChangeText={text => set_postData(prev => ({...prev, Name: text}))}
          style={styles.name}
        />

        <TextInput
          placeholderTextColor={'grey'}
          placeholder="Phone"
          keyboardType="numeric"
          value={postData.Phone}
          autoComplete={'off'}
          onChangeText={text => set_postData(prev => ({...prev, Phone: text}))}
          style={styles.name}
        />

        {/* <TouchableOpacity
        style={styles.categorySelection}
        onPress={() => {
          toggleModal();
          console.log('::', modalVisible);
        }}>
        <Text style={styles.categorySelectionText}>
          {selectedCategory.name}
        </Text>
      </TouchableOpacity> */}

        <DropDownPicker
          style={{marginBottom: 10}}
          open={openPicker}
          value={valuePicker}
          items={itemsPicker}
          setOpen={set_openPicker}
          setValue={set_valuePicker}
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
        {/* <ModalCategory
        visible={modalVisible}
        setModalVisible={setModalVisible}
        data={category.data}
        renderItem={renderItem}
      /> */}
      </ScrollView>
    </View>
  );
};
export default AddPostScreen;
