import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import firestore from '@react-native-firebase/firestore';

const API_URL = "https://us-central1-crud-app-3cd08.cloudfunctions.net"

const HomeScreen = ({navigation}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  // const getData = () => {
  //   const dataArray = [];
  //   firestore()
  //     .collection('Contacts')
  //     .get()
  //     .then(snapShot => {
  //       console.log('Snapshot:::', snapShot);
  //       snapShot.docs.map(each => {
  //         dataArray.push({...each.data(), id: each.id});
  //       });
  //       setData(dataArray);
  //     })
  //     .catch(error => {
  //       console.log('Some error in listing data', error);
  //     });
  // };

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


  

  const renderItem = ({item}) => {
    return (
      <View style={styles.renderContainer} >
        
        <TouchableOpacity style={styles.details} onPress= {() => navigation.navigate('Detail', {
        item
      })}>
          <Text style={styles.title}>{item.Title}</Text>
          <Text style={styles.name}>Author:{item.Name}</Text>
          <Text style={styles.name}>{item.Email}</Text>
          <Text style={styles.name}>{item.Phone}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default HomeScreen;
