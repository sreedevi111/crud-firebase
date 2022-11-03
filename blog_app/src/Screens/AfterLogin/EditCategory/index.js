import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import React, {useState, useEffect} from 'react';
import Toast from 'react-native-simple-toast';
import {
  editCategory,
  getcategories,
} from '../../../Redux/Actions/categoryAction';
import {useDispatch, useSelector} from 'react-redux';

import {NULLMSG} from '../../../Redux/types';

const EditCategory = ({navigation, route}) => {
  console.log('route', route.params.item);
  const dispatch = useDispatch();
  const [label, set_label] = useState(route.params.item.label);
  const updateMsg = useSelector(state => state.category.msg);

  const submitForm = () => {
    var test_label = String(label).length > 3;
    if (!test_label) {
      Toast.show('atleast 4 character long');
      return;
    }
    console.log('do we come here');
    dispatch(editCategory({label, id: route.params.item.value}));
  };

  useEffect(() => {
    if (updateMsg !== null) {
      Toast.show(updateMsg);
      if (updateMsg === 'success') {
        dispatch(getcategories());
        setTimeout(() => {
          navigation.goBack();
        }, 500);
      }
      dispatch({type: NULLMSG});
    }
  }, [updateMsg]);

  return (
    <View style={{flex: 1, backgroundColor: 'white', padding: 20}}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>EditCategory</Text>

      <TextInput
        value={label}
        onChangeText={text => set_label(text)}
        style={{
          color: 'black',
          marginVertical: 10,
          padding: 3,
          borderWidth: 1,
          borderRadius: 5,
          borderColor: 'grey',
        }}
      />

      <Button onPress={submitForm} title="Update" />
    </View>
  );
};

export default EditCategory;

const styles = StyleSheet.create({});
