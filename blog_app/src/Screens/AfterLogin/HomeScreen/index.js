import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-simple-toast';
import {styles} from './styles';
import * as storage from '../../../Services/AsyncStorageConfig';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '../../../Services/GoogleAuthConfigure';
import axios from 'axios';
import {API_URL} from '@env'



const HomeScreen = ({navigation, route}) => {
  console.log('Route of Home:', route.params);
  const [data, setData] = useState({loading: true}, []);
  const [visited, setVisited] = useState([]);
  const [filter, setFilter] = useState(false);

  console.log('data loading:', data.loading);

  useEffect(() => {
    getVisitedData();
    getData();
  }, []);

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

  const getData = () => {
    axios
      .get(`${API_URL}/getData`)
      .then(response => {
        console.log('response:::', response);
        response.data.data;
        setData(response.data.data);
      })
      .catch(e => {
        console.log('Some error', e);
      });
  };

  useEffect(() => {
    console.log('Visited current is >', visited);
  }, [visited]);

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
          <Text style={styles.name}>{item.Description}</Text>
          <Text style={styles.name}>{item.Phone}</Text>
          <Text style={styles.name}>{item.catName}</Text>

          <Image style={styles.image} source={{uri: item.Image}} />
        </View>

        <TouchableOpacity
          style={styles.icons}
          onPress={() => deleteData(item.id)}>
          <View style={styles.deleteButton}>
            <AntDesign name="delete" color="red" size={18} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.icons}
          onPress={() =>
            navigation.navigate('Edit', {
              id: item.id,
              Title: item.Title,
              Name: item.Name,
              Description: item.Description,
              Phone: item.Phone,
              Image: item.Image,
              // Category: item.Category.name,
              reload: getData(),
            })
          }>
          <View style={styles.editButton}>
            <AntDesign name="edit" color="blue" size={20} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  //Delete data
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

  return (
    <View style={styles.container}>
      {data.loading && <ActivityIndicator size="large" color="blue" />}
      <View style={styles.tabIcon}>
        <TouchableOpacity style={styles.user_icon}>
          <Icon name="filter" color={'#361614'} size={25} />
        </TouchableOpacity>
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
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity
        style={styles.plus}
        onPress={() => {
          navigation.navigate('Add',{
            reload:getData()
          });
        }}>
        <Text>
          <AntDesign name="pluscircleo" color="blue" size={25} />;
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
