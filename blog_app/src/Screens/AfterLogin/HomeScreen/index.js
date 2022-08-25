import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-simple-toast';
import {styles} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [visited, setVisited] = useState([])
  

  useEffect(() => {
    getVisitedData()
    getData()
  }, []);

const getVisitedData =  async () =>{
  try {
    let jsonValue = await AsyncStorage.getItem('@visited')
    console.log("JSON VALUE", jsonValue);
    if(jsonValue!=null){
      jsonValue = JSON.parse(jsonValue)
      setVisited(jsonValue)
    }
  } catch(e) {
    // error reading value
    console.log("ERROR:", e);
  }
}

  const getData = () => {
    const dataArray = [];
    firestore()
      .collection('Contacts')
      .get()
      .then(snapShot => {
        snapShot.docs.map(each => {
          dataArray.push({...each.data(), id: each.id});
        });
        setData(dataArray);
      })
      .catch(error => {
        console.log('Some error in listing data', error);
      });
  };

  useEffect(() =>{
    console.log("Visited current is >", visited)
  }, [visited])

  const visitDetail = async (id) =>{
    var tempVisited = visited;
    if(tempVisited.indexOf(id) == -1){
      tempVisited.push(id)
    }
    setVisited([...tempVisited])
    try {
      var convertToString = JSON.stringify(tempVisited)
      await AsyncStorage.setItem('@visited', convertToString)
     console.log("WE UPDATED STORAGE TOOO");
    } 
    catch(e) {
      // error reading value
      console.log("ERROR TO SAVE DATA::", e);
    }
   

  }

  const renderItem = ({item}) => {
    // console.log('Item in renderlist', item);
    // console.log('Item in renderlist', item);

    return (
      <View style={styles.renderContainer}>
        <View
          style={styles.details}
         >
          <Text style={[styles.title, {color:visited.indexOf(item.id) !==-1 ? '#3e67ed' : 'black' }]}  onPress={() =>
          {visitDetail(item.id);
            navigation.navigate('Detail', {
              // id: item.id,
              // Title: item.Title,
              // Name: item.Name,
              // Email: item.Email,
              // Phone: item.Phone,
              // Image: item.Image,
              // item:item
              item
            })
          }}>{item.Title}</Text>
          <Text style={styles.name}>Author:{item.Name}</Text>
          <Text style={styles.name}>{item.Email}</Text>
          <Text style={styles.name}>{item.Phone}</Text>
          {/* <Image style={styles.image} source={item.Image}  /> */}
          <Image style={styles.image} source={{uri: item.Image}} />
        </View>

        <TouchableOpacity
          style={styles.icons}
          onPress={() => preDelete(item.id)}>
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

  const preDelete = id => {
    Alert.alert('Alert', 'Are you sure to delete?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => deleteData(id)},
    ]);
  };

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
