import {Text, View, ScrollView, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';

const DetailScreen = ({navigation, route}) => {
  const [state, setState] = useState({
    Title: route.params.item.Title,
    Name: route.params.item.Name,
    Description: route.params.item.Description,
    timeinHuman: route.params.item.timeinHuman,
    Phone: route.params.item.Phone,
    Image: route.params.item.Image,
  });
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>{state.Title} </Text>
        <Image style={styles.image} source={{uri: state.Image}} />
        <Text style={styles.phone}>Date:{state.timeinHuman}</Text>
        <Text style={styles.description}>{state.Description}</Text>
        <Text style={styles.name}>Author:{state.Name}</Text>
        <Text style={styles.phone}>Ph:{state.Phone}</Text>
        

      </ScrollView>
    </View>
  );
};

export default DetailScreen;
