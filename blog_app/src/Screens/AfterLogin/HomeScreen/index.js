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
    console.log('Item in renderlist', item);
    return (
      <View style={styles.renderContainer}>
        <View style={styles.details}>
          <Text style={styles.title}>{item.Title}</Text>
          <Text style={styles.name}>Author:{item.Name}</Text>
          <Text style={styles.name}>{item.Email}</Text>
          <Text style={styles.name}>{item.Phone}</Text>
          <Image source={item.Image} style={styles.image} />
        </View>

        <TouchableOpacity
          style={styles.icons}
          onPress={() => preDelete(item.id)}>
          <AntDesign name="delete" color="red" size={18} />
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
              reload: getData(),
            })
          }>
          <AntDesign name="edit" color="blue" size={18} />
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
