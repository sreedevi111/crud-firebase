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



const HomeScreen = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const [visited, setVisited] = useState([]);

  useEffect(() => {
    getData();
    getVisitedData();
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
      <View style={styles.container} >
        <Image style={styles.imgContainer} source={{uri: item.Image}}/>
        <View>
        <Text style={[styles.title]} onPress={() => {navigation.navigate('Detail', {item})}}>{item.Title}</Text>
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
