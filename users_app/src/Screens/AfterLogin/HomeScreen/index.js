import {Text, View, FlatList, TouchableOpacity, Image, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import axios from 'axios';
import * as storage from '../../../Services/AsyncStorageConfig';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {API_URL} from "@env"



const HomeScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [visited, setVisited] = useState([]);

  useEffect(() => {
    getData();
    getVisitedData();
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


  const setVisitedData = async(id) =>{
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
  }

  const renderItem = ({item}) => {
    return (
      // <View style={[styles.renderContainer, {backgroundColor: visited.indexOf(item.id) !== -1 ? '#3e67ed' : 'pink'}]}>
      //   <TouchableOpacity
      //     // style={styles.details  }
      //     onPress={() =>
      //       {navigation.navigate('Detail', {
      //         item
      //       })
      //     setVisitedData(item.id);
      //     }
      //     }>
      //     <Text style={[styles.title]}>{item.Title}</Text>
      //     <Text style={styles.name}>Author:{item.Name}</Text>
      //     <Text style={styles.name}>{item.Email}</Text>
      //     <Text style={styles.name}>{item.Phone}</Text>
      //   </TouchableOpacity>
      // </View>
      <View style={styles.container}>
        <Image style={styles.imgContainer} source={{uri: item.Image}}/>
        <View>
        <Text style={[styles.title]}>{item.Title}</Text>
        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
<Text style={styles.name}>{item.timeinHuman}</Text>
<Text style={{color:'pink', fontStyle:'italic', fontSize:10,marginLeft:10}}>{item.catName}</Text>
        </View>
        </View>
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
