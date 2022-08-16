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

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-simple-toast';
// import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons';
import {styles} from './styles';

const HomeScreen = ({navigation}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

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

  const renderItem = ({item}) => {
    // console.log('Item in renderlist', item);
    return (
      <View style={styles.renderContainer}>
        <View style={styles.details}>
          <Text style={styles.title}>{item.Title}</Text>
          <Text style={styles.name}>Author:{item.Name}</Text>
          <Text style={styles.name}>{item.Email}</Text>
          <Text style={styles.name}>{item.Phone}</Text>
          <Image source={item.Image} style={styles.image}/>
        </View>

        <TouchableOpacity
          style={styles.icons}
          onPress={() => preDelete(item.id)}>
          <Text>
            <AntDesign name="delete" color="red" size={18} />;
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={styles.icons}
        onPress={() => navigation.navigate('Edit', {id:item.id, Title: item.Title, Name: item.Name, Email:item.Email, Phone: item.Phone, reload: getData()} )}>
          <Text>
            <AntDesign name="edit" color="blue" size={18} />;
          </Text>
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
