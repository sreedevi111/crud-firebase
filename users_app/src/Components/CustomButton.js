import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CustomButton = (props) => {
  return (
    <View>
     <TouchableOpacity style={{width:wp(25), height:hp(10), backgroundColor:props.bcolor, borderWidth:1, margin:10, justifyContent:'center', alignItems:'center'}} onPress={()=>props.function()}>
<Text style={{color:'black'}}>{props.title}</Text>
     </TouchableOpacity>
    </View>
  )
}

export default CustomButton

const styles = StyleSheet.create({})