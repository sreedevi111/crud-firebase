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
// import {categoryReducer} from '../../../Redux/Reducers/categoryreducer';
import {getcategories} from '../../../Redux/Actions/categoryAction';

//redux hooks
import {useSelector, useDispatch} from 'react-redux';

const CategoryScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.category.newscategories);

  console.log("Category check::::", categories)

  useEffect(() => {
    dispatch(getcategories());
    if (categories.length > 0) {
      console.log('cat:', categories);
    }
  }, []);

  console.log('cat:', categories);


  // To display Flatlist
  const renderItem = ({item}) => {
    //console.log('item>>', item);
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
            flex: 5,
            height: 50,
            justifyContent: 'center',
          }}>
          <Text style={{paddingLeft: 10, color: 'black'}}>
            {item.label}
          </Text>
        </View>
        <View  style={{flex:1}}>
          <TouchableOpacity onPress={()=>navigation.navigate('EditCategory', { item } )} >
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
      {categories.length > 0 && <FlatList data={categories} renderItem={renderItem} />}
    </View>
  );
};

export default CategoryScreen;