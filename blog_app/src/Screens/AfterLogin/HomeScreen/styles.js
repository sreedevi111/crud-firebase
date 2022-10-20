import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },

  renderContainer: {
    borderWidth: 1,
    width: '100%',
    borderRadius: 20,
    padding: 10,
    borderColor: 'grey',
    paddingVertical: hp(5),
    marginBottom: hp(2),
  },
  imageRow: {
    height: hp(20),
    flexDirection: 'row',
  },
  textBox: {
    height: hp(20),
    width: wp(45),
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  catName: {
    color: 'purple',
    fontSize: 14,
  },
  name: {
    color: 'black',
    fontStyle: 'italic',
    fontSize: 10,
    marginLeft: wp(5),
  },
  iconRow: {
    height: hp(5),
    marginTop: hp(2),
    padding: hp(1),
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  plus: {
    // justifyContent: 'flex-end',
    left: 300,
    bottom: 10,
    
  },
  user_icon: {
    width: 30,
    margin: 20,
    height: 30,
  },
  tabIcon: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
  },
});

export {styles};
