import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-simple-toast';
import {styles} from './styles';
import * as storage from '../../../Services/AsyncStorageConfig';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '../../../Services/GoogleAuthConfigure';
import axios from 'axios';
import {API_URL} from '@env';
import _ from 'lodash';
import DropDownPicker from 'react-native-dropdown-picker';


//redux hooks
import {useSelector, useDispatch} from 'react-redux';

//redux action
import { getpost, deletepost, addpost } from '../../../Redux/Actions/postAction';

const HomeScreen = ({navigation, route}) => {
  // const [data, setData] = useState({loading: true, data: []});
  const [visited, setVisited] = useState([]);
  // const [filter, setFilter] = useState(false);

 

  //To Filter
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([]);


  const dispatch = useDispatch();
  const post = useSelector(state => state.post.post)
  // console.log("Post in home screen check::::", post)

  // useEffect(() => {
  //   // getVisitedData();
  //   // getData();
  // }, []);

  useEffect(()=>{
    dispatch(getpost());
  }, [])

  

  //Getting visited detail
  const getVisitedData = async () => {
    try {
      let jsonValue = await storage.getItem('@visited');
      console.log('JSON VALUE', jsonValue);
      if (jsonValue != null) {
        jsonValue = JSON.parse(jsonValue);
        setVisited(jsonValue);
      }
    } catch (e) {
      console.log('ERROR:', e);
    }
  };

  useEffect(() => {
    console.log('Visited current is >', visited);
  }, [visited]);

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

  //For displaying items in flatlist
  const renderItem = ({item}) => {
    return (
      <View style={styles.renderContainer}>
        <View style={styles.details}>
          <Text
            style={[
              styles.title,
              {color: visited.indexOf(item.id) !== -1 ? '#3e67ed' : 'black'},
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
          <Text style={styles.name}>{item.catName}</Text>
          <Text style={styles.name}>{item.timeinHuman}</Text>
          <Image style={styles.image} source={{uri: item.Image}} />
        </View>

        <View
          style={[
            styles.icons,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            },
          ]}>
          {/* Delete icon */}
          <TouchableOpacity onPress={() => dispatch(deletepost(item.id))}>
            <View style={styles.deleteButton}>
              <AntDesign name="delete" color="red" size={18} />
            </View>
          </TouchableOpacity>

          {/* Edit icon  */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Edit', {
                id: item.id,
                Title: item.Title,
                Name: item.Name,
                Description: item.Description,
                timeinHuman: item.timeinHuman,
                Image: item.Image,
                reload: getData(),
              })
            }>
            <View style={styles.editButton}>
              <AntDesign name="edit" color="blue" size={20} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  //Delete data function
  const deleteData = id => {
    firestore()
      .collection('Contacts')
      .doc(id)
      .delete()
      .then(() => {
        Toast.show('Item deleted successfully!!');
        getData();
      })
      .catch(error => {
        Toast.show('Error to delete data', error);
      });
  };

  useEffect(() => {
    SelectCategories();
  }, []);

  const SelectCategories = () => {
    firestore()
      .collection('Categories')
      .get()
      .then(response => {
        var categorylist = [];
        response.docs.map(each => {
          // categorylist.push({...each.data(), id: each.id});
          categorylist.push({label: each.data().name, value: each.id});
        });
        // categorylist.push({label: 'Select Category', value: null});
        // console.log('Category List::', categorylist);
        // setCategory(prev => ({...prev, data: categorylist}));
        setItems([...categorylist]); //?Adding to dropdownlist
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    // console.log('Valu:::', );
    if (value.length != 0) {
      categoryFilter();
      console.log('Value of Array:', value);
    }
  });

  const categoryFilter = () => {
    firestore()
      .collection('Contacts')
      .where('catID', 'in', value)
      .get()
      // .then(response => {
      //   console.log('filtered dta:', response.data);
      //   SelectArray.push(response.docs.data())

      // });

      .then(querySnapshot => {
        var a = [];
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, ' => ', doc.data());
          console.log('QQQQ::', [doc.data()]);
          a.push(doc.data());
          // setData([doc.data()]);
        });
        setData(a);
        // console.log("tesfvsd:::", querySnapshot.docs())
        // setData(querySnapshot)
      });
  };

  return (
    <View style={styles.container}>
      {post.loading && <ActivityIndicator size="large" color="blue" />}
      <View style={styles.tabIcon}>
        {/* <TouchableOpacity style={styles.user_icon}> */}
        {/* <Icon name="filter" color={'#361614'} size={25} /> */}
        <View style={{width: 150}}>
          <DropDownPicker
            placeholder="Filter"
            multiple={true}
            min={0}
            max={5}
            showBadgeDot={true}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
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

        {/* </TouchableOpacity> */}
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
        data={post}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity
        style={styles.plus}
        onPress={() => {
          navigation.navigate('Add', {
            // reload: getData(),
          });
        }}>
        <AntDesign name="pluscircleo" color="blue" size={25} />
      </TouchableOpacity>

      <TouchableOpacity
        style={{width: 30}}
        onPress={() => {
          navigation.navigate('Category');
        }}>
        <MaterialIcon name="category" color="blue" size={25} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
