import {Text, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';

//importing action and reducer
import {categoryReducer} from '../../../Redux/Reducers/categoryreducer';
import {getcategories} from '../../../Redux/Actions/categoryAction';

//redux hooks
import {useSelector, useDispatch} from 'react-redux';



const CategoryScreen = () => {
  const [state1, setState1 ] = useState(null)
  const dispatch = useDispatch();
  const categories = useSelector(state => state.category.newscategories);

  useEffect(() => {
    dispatch(getcategories());
    console.log("cat:", categories)
      //   var c = [];
      // let b = categories.forEach(element => {
      //   c.push(<Text style={{color: 'black'}}>{element.label}</Text>);
      // });
      // console.log("c", c)
  
  }, []);

  useEffect(()=> {
    if(categories.length > 0){
      var c = [];
      let b = categories.forEach((element,index) => {
        c.push(<Text key={index} style={{color: 'black'}}>{element.label}</Text>);
      });
      setState1(c)
    }
  },[categories])

  

  



  return (
    <View>
     <Text style={{color:'black'}}>{state1}</Text>
    </View>
  );
};

export default CategoryScreen;
