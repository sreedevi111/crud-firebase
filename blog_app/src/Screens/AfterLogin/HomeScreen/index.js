import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  LogBox,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import _, { merge } from 'lodash';
import DropDownPicker from 'react-native-dropdown-picker';
import {styles} from './styles';
import * as storage from '../../../Services/AsyncStorageConfig';
import {GoogleSignin} from '../../../Services/GoogleAuthConfigure';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//redux hooks
import {useSelector, useDispatch} from 'react-redux';

//redux action
import {getpost, deletepost} from '../../../Redux/Actions/postAction';
import {getcategories} from '../../../Redux/Actions/categoryAction';

const HomeScreen = ({navigation, route}) => {
  const [visited, setVisited] = useState([]);

  //To Filter
  const [openPicker, set_openPicker] = useState(false);
  const [valuePicker, set_valuePicker] = useState([]);

  const items = useSelector(state => state.category.newscategories);
  const dispatch = useDispatch();
  const post = useSelector(state => state.post.post); //downloaded posts from server

  const [filteredPosts, set_filteredPosts] = useState([]);
  const [mybookmarks, set_mybookmarks] = useState([]); // array of bookmark id
  const [currentuser, set_currentuser] = useState(null);

  const userId = auth().currentUser._user.uid;

  useEffect(() => {
    dispatch(getpost());
    dispatch(getcategories());

    const currentUser = auth().currentUser;
    set_currentuser(currentUser);
    console.log('currentUser', currentUser._user.uid);

    firestore()
      .collection('users')
      .doc(userId)
      .get()
      .then(mydata => {
        console.log("My????", mydata)
        console.log('mybookmarkslist', mydata.data().bookmarks);
        set_mybookmarks([...mydata.data().bookmarks]);
      });

  }, []);

  useEffect(() => {
    LogBox.ignoreLogs(['Possilble Unhandled Promise']);
  });

  useEffect(() => {
    if (post.length > 0) {
      set_filteredPosts([...post]);
    }
  }, [post]);

  useEffect(() => {
    if (valuePicker.length > 0) {
      let filtered_posts = _.filter(post, post =>
        _.includes(valuePicker, post.catID),
      );
      set_filteredPosts([...filtered_posts]);
    } else {
      set_filteredPosts([...post]);
    }
  }, [valuePicker]);

  useEffect(() => {
    getVisitedData();
  }, [visited]);

  //Getting visited detail
  const getVisitedData = async () => {
    try {
      let jsonValue = await storage.getItem('@visited');
      if (jsonValue != null) {
        jsonValue = JSON.parse(jsonValue);
        setVisited(jsonValue);
      }
    } catch (e) {
      console.log('ERROR:', e);
    }
  };

  //Storing visited detail
  const visitDetail = async id => {
    var tempVisited = visited;
    if (tempVisited.indexOf(id) == -1) {
      tempVisited.push(id);
    }
    setVisited([...tempVisited]);
    try {
      var convertToString = JSON.stringify(tempVisited);
      await storage.setItem('@visited', convertToString);
      console.log('WE UPDATED STORAGE TOOO');
    } catch (e) {
      console.log('ERROR TO SAVE DATA::', e);
    }
  };

  const bookmarkToggle = itemID => {
    let index = mybookmarks.indexOf(itemID);
    var tmpbookmarks = [...mybookmarks];
     // Checking bookmark
  console.log('What is my bookmark::::::', tmpbookmarks);
  //
    if (index !== -1) {
      tmpbookmarks.splice(index, 1);
    } else {
      tmpbookmarks.push(itemID);
    }
    firestore()
      .collection('users')
      .doc(userId)
      .set({bookmarks: tmpbookmarks}, {merge:true});
    set_mybookmarks([...tmpbookmarks]);
  };


  //For displaying items in flatlist
  const renderItem = ({item}) => {
    return (
      <View style={styles.renderContainer}>
        <View style={styles.imageRow}>
          {typeof item.Image !== 'undefined' && item.Image !== '' && (
            <Image
              style={{width: wp(40), height: hp(20)}}
              source={{uri: item.Image}}
            />
          )}

          <View>
            <View style={styles.textBox}>
              <Text
                style={[
                  styles.title,
                  {
                    color:
                      visited.indexOf(item.id) !== -1 ? '#3e67ed' : 'black',
                  },
                ]}
                onPress={() => {
                  visitDetail(item.id);
                  navigation.navigate('Detail', {
                    item,
                  });
                }}>
                {item.Title}
              </Text>
              <Text style={styles.name}>Author:{item.Name}</Text>
              <Text style={styles.name}>{item.time}</Text>
              <Text style={styles.name}>{item.timeinHuman}</Text>
            </View>
          </View>
        </View>
        <View style={styles.iconRow}>
          <View style={styles.icons}>
            <Text style={styles.catName}>{item.catName}</Text>
            <TouchableOpacity
              onPress={() => {
                dispatch(deletepost(item.id));
                dispatch(getpost());
              }}>
              <View style={styles.deleteButton}>
                <AntDesign name="delete" color="red" size={18} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Edit', item);
              }}>
              <View style={styles.editButton}>
                <AntDesign name="edit" color="blue" size={20} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => bookmarkToggle(item.id)}>
              <View style={styles.editButton}>
                <AntDesign
                  name={
                    mybookmarks.indexOf(item.id) !== -1 ? 'heart' : 'hearto'
                  }
                  color="red"
                  size={20}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {post.loading && <ActivityIndicator size="large" color="blue" />}
      <View style={styles.tabIcon}>
        <View style={{width: 150}}>
          <DropDownPicker
            placeholder="Filter"
            multiple={true}
            min={0}
            max={5}
            showBadgeDot={true}
            open={openPicker}
            value={valuePicker}
            items={items}
            setOpen={set_openPicker}
            setValue={set_valuePicker}
            setItems={() => dispatch(getcategories())}
            mode="BADGE"
            badgeDotColors={[
              '#e76f51',
              '#00b4d8',
              '#e9c46a',
              '#e76f51',
              '#8ac926',
              '#00b4d8',
              '#e9c46a',
            ]}
          />
        </View>

        <TouchableOpacity
          style={styles.user_icon}
          onPress={() => {
            auth().signOut();
            GoogleSignin.signOut();
          }}>
          <AntDesign name="user" color={'blue'} size={25} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredPosts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default HomeScreen;
