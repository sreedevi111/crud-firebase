import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-simple-toast';
import {styles} from './styles';
import * as storage from '../../../Services/AsyncStorageConfig';
import auth from '@react-native-firebase/auth';
import {GoogleSignin } from '../../../Services/GoogleAuthConfigure'
import axios from 'axios';

const API_URL = "https://us-central1-crud-app-3cd08.cloudfunctions.net"


const HomeScreen = ({navigation, route}) => {
  // console.log('Route of Home:', route.params);
  const [data, setData] = useState([]);
  const [visited, setVisited] = useState([]);
  const [filter, setFilter] = useState(false)
  

  useEffect(() => {
    getVisitedData();
    getData();
  }, []);

  const getVisitedData = async () => {
    try {
      let jsonValue = await storage.getItem('@visited');
      if (jsonValue != null) {
        jsonValue = JSON.parse(jsonValue);
        setVisited(jsonValue);
      }
    } catch (e) {
      // error reading value
      console.log('ERROR:', e);
    }
  };
  // const getData = async () => {
  //   const dataArray = []
  //   try {
  //     var snapShot = await firestore().collection('Conects').get()
  //     if(snapShot){
  //       console.log('doc',snapShot.size)
  //       snapShot.docs.map(each => {
  //                  dataArray.push({...each.data(), id: each.id});
  //        });
  //         setData(dataArray);
  //     }
  //   } catch(error){

  //   }
    
    
  // }
  // const getData = () => {
  //   const dataArray = [];
  //   firestore()
  //     .collection('Contacts')
  //     .get()
  //     .then(snapShot => {
  //       snapShot.docs.map(each => {
  //         dataArray.push({...each.data(), id: each.id});
  //       });
  //       setData(dataArray);
  //     })
  //     .catch(error => {
  //       console.log('Some error in listing data', error);
  //     });
  // };


  const getData = async() => {
  const response = await axios.get(`${ API_URL}/getData`)
  try{
    response.data.data
    setData(response.data.data);
  }
 catch{
  e=>{
    console.log("Error::", e)
  }
 }
}

  useEffect(() => {
    console.log('Visited current is >', visited);
  }, [visited]);

  const visitDetail = async( id) => {
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
      // error reading value
      console.log('ERROR TO SAVE DATA::', e);
    }
    // console.log("Visited::::::11111", visited.indexOf(item.id))
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.renderContainer}>
        <View style={styles.details}>
          <Text
            
            onPress={() => {
              visitDetail(item.id);
              console.log("Item:::")
              navigation.navigate('Detail', {
                item,
              });
            }}
            style={[
              styles.title,
              {color: visited.indexOf(item.id) !== -1 ? '#3e67ed' : 'black'},
            ]}
            >
            {item.Title}
          </Text>
          <Text style={styles.name}>Author:{item.Name}</Text>
          <Text style={styles.name}>{item.Email}</Text>
          <Text style={styles.name}>{item.Phone}</Text>
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
              Email: item.Email,
              Phone: item.Phone,
              Image: item.Image,
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

  

  // const preDelete = id => {
  //   Alert.alert('Alert', 'Are you sure to delete?', [
  //     {
  //       text: 'Cancel',
  //       onPress: () => console.log('Cancel Pressed'),
  //       style: 'cancel',
  //     },
  //     {text: 'Yes', onPress: () => {
  //  deleteData();
  //     }},
  //   ]);
  // };

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
      <View style={styles.tabIcon}>
      <TouchableOpacity style={styles.user_icon} >
<Icon name='filter' color={'#361614'} size={25}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.user_icon}  onPress={()=>
        {
        auth().signOut()
        GoogleSignin.signOut();
        }
        }>
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
          navigation.navigate('Add');
        }}>
        <Text>
          <AntDesign name="pluscircleo" color="blue" size={25} />;
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
