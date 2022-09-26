import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    height: hp(40),
    width: wp(80),
    margin: wp(10),
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontFamily: 'Lato-Black',
    margin: wp(2),
    alignItems: 'center',
  },
  name: {
    color: 'black',
    fontStyle: 'italic',
    fontSize:12
  },

  phone: {
    color: 'black',
    fontStyle: 'italic',
    fontSize:12
  },
  description:{
    color:'black',
    fontFamily:'Slabo27px-Regular',
    fontSize:16,
    margin:wp(2)
  }
});

export {styles};
