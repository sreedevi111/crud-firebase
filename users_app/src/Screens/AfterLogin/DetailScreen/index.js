import { Text, View, ScrollView } from 'react-native'
import React, {useState} from 'react'
import styles from './styles'

const DetailScreen = ({navigation, route}) => {
  console.log("route.params in Detail::", route.params);
  const [state, setState] = useState({
    Title: route.params.item.Title,
    Name: route.params.item.Name,
    Email: route.params.item.Email,
    Phone: route.params.item.Phone,
  });
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.detail}>
        <Text style={styles.title}>{state.Title} </Text>
        <Text style={styles.name}>{state.Name}</Text>
        <Text style={styles.email}>{state.Email}</Text>
        <Text style={styles.phone}>{state.Phone}</Text>
        </View>
        
      </ScrollView>
    </View>
  )
}

export default DetailScreen

