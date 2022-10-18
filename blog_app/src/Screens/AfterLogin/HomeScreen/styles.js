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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    width: wp('40%'),
    height: hp('30%'),
  },
  name: {
    color: 'black',
    fontStyle: 'italic',
    fontSize: 10,
  },
  catName: {
    color: 'purple',
    fontSize: 14,
  },
  image: {
    width: wp('50%'),
    height: hp('30%'),
    borderRadius: 20,
  },
  comments: {
    color: 'blue',
  },

  renderContainer: {
    borderWidth: 1,
    width: '100%',
    borderRadius: 20,
    padding: 10,
    borderColor: 'grey',
    paddingVertical: 10,
    // flexDirection: 'row',
    marginBottom: 20,
  },
  details: {
    flex: 2,
    // flexDirection:'row'
  },
  icons: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    // height:20,
  },
  plus: {
    justifyContent: 'flex-end',
    left: 300,
    bottom: 10,
    position: 'absolute',
  },
  deleteButton: {
    height: 20,
    width: 20,
  },
  editButton: {
    height: 20,
    width: 20,
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
