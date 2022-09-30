import {
  Text,
  View,
  FlatList,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';

//importing action and reducer
import {categoryReducer} from '../../../Redux/Reducers/categoryreducer';
import {getcategories} from '../../../Redux/Actions/categoryAction';

//redux hooks
import {useSelector, useDispatch} from 'react-redux';

const CategoryScreen = () => {
  const [cat1, setCat1] = useState(null);
  const dispatch = useDispatch();
  const categories = useSelector(state => state.category.newscategories);

  useEffect(() => {
    dispatch(getcategories());
    if (categories.length > 0) {
      console.log('cat:', categories);
      setCat1(categories);
    }
  }, []);

  console.log('cat:', categories);

  console.log('>>>>>', cat1);

  // useEffect(() => {
  //   if (categories.length > 0) {
  //     var c = [];
  //     let b = categories.forEach((element, index) => {
  //       c.push(
  //         <Text key={index} style={{color: 'black'}}>
  //           {element.label}
  //         </Text>,
  //       );
  //     });
  //     setCat1(c);
  //   }
  // }, [categories]);

  // To display Flatlist
  const renderItem = item => {
    console.log('item>>', item);
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomColor: 'black',
          borderBottomWidth: 0.5,
         
        }}>
        <View
          style={{
            height: 50,
            justifyContent: 'center',
          }}>
          <Text style={{paddingLeft: 10, color: 'black'}}>
            {item.item.label}
          </Text>
        </View>
        <View  style={{left:150}}>
          <TouchableOpacity >
            <AntDesign name="edit" color="blue" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View>
      <Text style={{color: 'black', fontFamily: 'Lato-Black', fontSize: 25}}>
        LIST OF CATEGORIES
      </Text>
      {categories !== null && <FlatList data={cat1} renderItem={renderItem} />}
    </View>
  );
};

export default CategoryScreen;
