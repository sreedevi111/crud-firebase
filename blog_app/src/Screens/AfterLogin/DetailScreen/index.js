import {Text, View, ScrollView,Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';

const DetailScreen = ({navigation, route}) => {
  const [state, setState] = useState({
    Title: route.params.item.Title,
    Name: route.params.item.Name,
    Description: route.params.item.Description,
    Phone: route.params.item.Phone,
    Image: route.params.item.Image,
  });
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image style={styles.image} source={{uri: state.Image}} />
        <View style={styles.detail}>
        <Text style={styles.title}>{state.Title} </Text>
        <Text style={styles.name}>{state.Name}</Text>
        <Text style={styles.email}>{state.Description}</Text>
        <Text style={styles.phone}>{state.Phone}</Text>
        </View>
        
      </ScrollView>
    </View>
  );
};

export default DetailScreen;
