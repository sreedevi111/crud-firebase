// import {
//   StyleSheet,
//   Text,
//   View,
//   ActivityIndicator,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import React, {useState, useEffect} from 'react';
// import Toast from 'react-native-simple-toast';
// import firestore from '@react-native-firebase/firestore';
// import {styles} from './styles';

// const HomeScreen = () => {
//   const [state, setState] = useState({loading: true, data: []});

//   const dataArray = [];

//   useEffect(() => {
//     firestore()
//       .collection('Contacts')
//       .get()
//       .then(getData => {
//         // console.log('getData', getData);
//         getData.docs.map(each => {
//           // console.log('data', each.data(), 'id', each.id);
//           dataArray.push({...each.data(), id: each.id});
//           // console.log('My array', dataArray);
//           setState(prev => ({...prev, loading: false, data: dataArray}));
//           // console.log('DATA TO CHECK', dataArray);
//         });
//       })
//       .catch(error => {
//         console.log('error', error);
//         setState(prev => ({...prev, loading: false}));
//         Toast.show('There is network connection problem', Toast.LONG);
//       });
//   }),
//     [];

//   const myList = () => {
//     var myarray = [];
//     for (let eachLine of state.data) {
//       // console.log('eachLine',eachLine)
//       myarray.push(
//         <TouchableOpacity
//           onPress={() =>
//             navigation.navigate('detail', {
//               id: eachLine.id,
//               Name: eachLine.Name,
//               Email: eachLine.Email,
//               Phone: eachLine.Phone,
//             })
//           }
//           style={{
//             backgroundColor: '#fafafa',
//             borderBottomWidth: 0.5,
//             borderBottomColor: 'grey',
//             padding: 10,
//           }}>
//           <Text style={styles.title}>{eachLine.Title}</Text>
//           <Text style={styles.name}>Author: {eachLine.Name}</Text>
//           <Text style={styles.name}>Email: {eachLine.Email}</Text>
//           <Text style={styles.name}>Phone: {eachLine.Phone}</Text>
//         </TouchableOpacity>,
//       );
//     }

//     return myarray;
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView>
//         {state.loading && <ActivityIndicator size="large" color="blue" />}
//         {myList()}
//       </ScrollView>
//     </View>
//   );
// };

// export default HomeScreen;

import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import { styles } from './styles';

const HomeScreen = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const dataArray = [];
    firestore()
      .collection('Contacts')
      .get()
      .then(snapShot => {
        snapShot.docs.map(each => {
          dataArray.push({...each.data(), id: each.id});
        })
        setData(dataArray);
      })
      .catch(error =>{
        console.log('Some error in listing data', error)
      })
  }, []);

  const renderItem = ({item}) => {
    console.log('Item in renderlist', item);
    return (
      <View style={styles.renderContainer}>
        <Text style={styles.title}>{item.Title}</Text>
        <Text style={styles.name}>Author:{item.Name}</Text>
        <Text style={styles.name}>{item.Email}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default HomeScreen;
