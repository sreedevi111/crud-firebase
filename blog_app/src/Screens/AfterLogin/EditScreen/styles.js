import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  name: {
    marginTop: 20,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    color: 'black',
    marginBottom: 20,
  },
  title: {
    marginTop: 20,

    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    color: 'black',
    paddingVertical: 20,
  },
  imagePicker:{
    width:250,
    height:250,
    borderRadius:30,
    borderColor: 'grey',
    borderWidth: 1,
    justifyContent:'center',
    alignItems:'center'

  },
});

export {styles};
