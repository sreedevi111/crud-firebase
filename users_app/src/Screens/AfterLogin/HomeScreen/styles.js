import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontSize:20,
    fontWeight:'500'
  },

  name: {
    color: 'black',
    fontStyle: 'italic',
    fontSize: 10,
  },
container:{
  flexDirection:'row',
  alignItems:'center'
},
imgContainer:{
  height:hp(20), 
  width:hp(20), 
  margin:20
}
  
});

export default styles;
