// import {FlatList, StyleSheet, Text, View} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import {firebase} from '@react-native-firebase/firestore';
// import styles from '../HomeScreen/styles';

// const BookmarkScreen = () => {
//   const currentUser = auth().currentUser;
//   const [mybookmarks, set_mybookmarks] = useState([]);
//   const [book, setBook] = useState([]);

//   console.log('currentUser', currentUser._user.uid);
//   useEffect(() => {
//     firestore()
//       .collection('users')
//       .doc(currentUser._user.uid)
//       .get()
//       .then(mydata => {
//         console.log('Want to know mydata??', mydata);
//         console.log(
//           'mybookmarkslist:::::::::::::::::::::::::::::',
//           mydata.data().bookmarks,
//         );
//         setBook(mydata.data().bookmarks);

//         firestore()
//           .collection('Contacts')
//           .where(
//            firebase.firestore.FieldPath.documentId(),
//            'in',
//            mydata.data().bookmarks,
//           )
//           .get()
//           .then(res => {
//             res.forEach(doc => {
//               console.log('Data???', doc);
//               console.log('QQQQ::', [doc._data]);
//             });
//           });
//       });
//   }, []);

//   console.log('Any value for bookk???', book);

//   const renderItem = ({item}) => {
//     return (
//       <View style={styles.renderContainer}>
//         <View style={styles.imageRow}>
//           {typeof item.Image !== 'undefined' && item.Image !== '' && (
//             <Image
//               style={{width: wp(40), height: hp(20)}}
//               source={{uri: item.Image}}
//             />
//           )}

//           <View>
//             <View style={styles.textBox}>
//               <Text
//                 style={[
//                   styles.title,
//                   {
//                     color:
//                       visited.indexOf(item.id) !== -1 ? '#3e67ed' : 'black',
//                   },
//                 ]}
//                 onPress={() => {
//                   visitDetail(item.id);
//                   navigation.navigate('Detail', {
//                     item,
//                   });
//                 }}>
//                 {item.Title}
//               </Text>
//               <Text style={styles.name}>Author:{item.Name}</Text>
//               <Text style={styles.name}>{item.time}</Text>
//               <Text style={styles.name}>{item.timeinHuman}</Text>
//             </View>
//           </View>
//         </View>
//         <View style={styles.iconRow}>
//           <View style={styles.icons}>
//             <Text style={styles.catName}>{item.catName}</Text>
//             <TouchableOpacity
//               onPress={() => {
//                 dispatch(deletepost(item.id));
//                 dispatch(getpost());
//               }}>
//               <View style={styles.deleteButton}>
//                 <AntDesign name="delete" color="red" size={18} />
//               </View>
//             </TouchableOpacity>

//             <TouchableOpacity
//               onPress={() => {
//                 navigation.navigate('Edit', item);
//               }}>
//               <View style={styles.editButton}>
//                 <AntDesign name="edit" color="blue" size={20} />
//               </View>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => bookmarkToggle(item.id)}>
//               <View style={styles.editButton}>
//                 <AntDesign
//                   name={
//                     mybookmarks.indexOf(item.id) !== -1 ? 'heart' : 'hearto'
//                   }
//                   color="red"
//                   size={20}
//                 />
//               </View>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <View>
//       <FlatList data={mybookmarks} renderItem={renderItem} />
//     </View>
//   );
// };

// export default BookmarkScreen;

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const BookmarkScreen = () => {
  return (
    <View>
      <Text style={{color:'black', fontSize:20}}>Will update this session soon..........</Text>
    </View>
  )
}

export default BookmarkScreen

const styles = StyleSheet.create({})
