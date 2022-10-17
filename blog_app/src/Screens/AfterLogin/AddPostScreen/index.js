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
} from '../../../Redux/Actions/postAction';

const AddPostScreen = ({navigation}) => {
  const postData = useSelector(state => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  // console.log("post::::: Addd", post)

  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // For dropdown
  const [open, setOpen] = useState(false); // status of dropdownload status = false, status = true
  const [value, setValue] = useState(null); //to store select option of dropdown
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log('value', value);
  }, [value]);

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
    ImageAddition();
    dispatch(
      addpost({
        ...postData,
        catName: catName[0].label,
        catID: value,
        timeCreated: Moment().unix(),
        timeinHuman: Moment().format('DD-MM-YYYY'),
      }),
    );

    dispatch(getpost());

    pushNotification();
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

  var catName = _.filter(items, item => {
    return item.value == value;
  });

  //Image adding
  const ImageAddition = async () => {
    if (selectedImage?.path) {
      console.log('Yes selected image has path');
      var extension = '';
      const res = dispatch(addpost);
      console.log('RESPONSE IN IMAGE ADDITION', res);
      if (selectedImage.mime === 'image/jpeg') {
        extension = 'jpg';
      } else if (selectedImage.mime === 'image/png') {
        extension = 'png';
      }
      imagename = `${res.id}.${extension}`;
      await storage().ref('sample.jpeg').putFile(selectedImage.path);
      var url = await storage().ref('sample.jpeg').getDownloadURL();
      await firestore().collection('Contacts').doc(res.id).update({Image: url});
      setLoading(false);
      Toast.show('Image updated successfully!!!');
    } else {
      setLoading(false);
      Toast.show('Uploaded Successfully');
      navigation.navigate('Home');
    }
  };

  // console.log('catName', catName[0].label);
  // const addContactDatatoFirestore = async () => {
  //   try {
  //     var res = await firestore()
  //       .collection('Contacts')
  //       .add({
  //         Title: state.Title,
  //         Name: state.Name,
  //         Description: state.Description,
  //         Phone: state.Phone,
  //         catName: catName[0].label,
  //         catID: value,
  //         timeCreated: Moment().unix(),
  //         timeinHuman: Moment().format('DD-MM-YYYY'),
  //       });

  //     if (res) {
  //       if (selectedImage?.path) {
  //         var extension = '';
  //         if (selectedImage.mime === 'image/jpeg') {
  //           extension = 'jpg';
  //         } else if (selectedImage.mime === 'image/png') {
  //           extension = 'png';
  //         }
  //         imagename = `${res.id}.${extension}`;
  //         await storage().ref('sample.jpeg').putFile(selectedImage.path);
  //         var url = await storage().ref('sample.jpeg').getDownloadURL();
  //         await firestore()
  //           .collection('Contacts')
  //           .doc(res.id)
  //           .update({Image: url});
  //         setLoading(false);
  //         Toast.show('Image updated successfully!!!');

  //       } else {
  //         setLoading(false);
  //         Toast.show('Uploaded Successfully');
  //         navigation.navigate('Home');
  //       }
  //       imagename = `${res.id}.${extension}`;
  //       await storage().ref('sample.jpeg').putFile(selectedImage.path);
  //       var url = await storage().ref('sample.jpeg').getDownloadURL();
  //       await firestore()
  //         .collection('Contacts')
  //         .doc(res.id)
  //         .update({Image: url});
  //       setLoading(false);
  //       Toast.show('Image updated successfully!!!');
  //       navigation.navigate('Home');
  //     } else {
  //       setLoading(false);
  //       Toast.show('Image updated successfully!!!');
  //       navigation.navigate('Home');
  //     }
  //   } catch (error) {
  //     console.log('Image failed to upload', error);
  //   }
  // };

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

  // For Modal category
  // const [modalVisible, setModalVisible] = useState(false);
  // const [category, setCategory] = useState({data: []});
  // const [selectedCategory, setSelectedCategory] = useState({
  //   name: 'Select Category',
  //   id: null,
  // });

  useEffect(() => {
    SelectCategories();
  }, []);

  // const onSelectItem = item => {
  //   setSelectedCategory(item);
  //   console.log('selected Category::', item);
  //   toggleModal();
  // };

  // const toggleModal = () => {
  //   setModalVisible(!modalVisible);
  // };

  const SelectCategories = () => {
    firestore()
      .collection('Categories')
      .get()
      .then(response => {
        var categorylist = [];
        // console.log('response check::::::', response.docs);
        response.docs.map(each => {
          // categorylist.push({...each.data(), id: each.id});
          categorylist.push({label: each.data().name, value: each.id});
        });
        categorylist.push({label: 'Select Category', value: null});
        // console.log('Category List::', categorylist);
        // setCategory(prev => ({...prev, data: categorylist}));
        setItems([...categorylist]); //?Adding to dropdownlist
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  // //For modal flat list
  //   const renderItem = ({item}) => {
  //     console.log('Item inrender Item::', item);
  //     return (
  //       <View style={{backgroundColor: 'white'}}>
  //         <TouchableOpacity
  //           onPress={() => onSelectItem(item)}
  //           style={{height: 60}}>
  //           <Text
  //             style={{
  //               color: 'black',
  //               padding: 10,
  //               fontSize: 16,
  //               marginLeft: 30,
  //             }}>
  //             {item.name}
  //           </Text>
  //         </TouchableOpacity>
  //       </View>
  //     );
  //   };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator animating size={'large'} />}
      <ScrollView>
        <TextInput
          placeholderTextColor={'grey'}
          placeholder="Title"
          value={postData.Title}
          onChangeText={Title => dispatch(statechangeaction({Title: Title}))}
          style={styles.title}
        />
        <TextInput
          placeholderTextColor={'grey'}
          placeholder="Description"
          value={postData.Description}
          onChangeText={Description =>
            dispatch(statechangeaction({Description: Description}))
          }
          style={styles.name}
        />
        <TextInput
          placeholderTextColor={'grey'}
          placeholder="Name"
          value={postData.Name}
          onChangeText={Name => dispatch(statechangeaction({Name: Name}))}
          style={styles.name}
        />

        <TextInput
          placeholderTextColor={'grey'}
          placeholder="Phone"
          keyboardType="numeric"
          value={postData.Phone}
          onChangeText={Phone => dispatch(statechangeaction({Phone: Phone}))}
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
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
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
