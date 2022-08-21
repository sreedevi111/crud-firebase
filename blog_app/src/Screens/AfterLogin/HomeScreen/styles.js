import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    color: 'black',
    fontStyle: 'italic',
    fontSize: 10,
  },
  image: {
    width: 200,
    height: 180,
    borderRadius:20
    // backgroundColor:'black'
  },
  comments: {
    color: 'blue',
  },

  renderContainer: {
    borderWidth: 1,
    width:'100%',
borderRadius:20,
padding:10,
    borderColor: 'grey',
    paddingVertical: 10,
    flexDirection: 'row',
    marginBottom:20
  },
  details: {
    flex: 2,
  },
  icons: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
   
  },
  plus: {
    justifyContent: 'flex-end',
    left: 300,
    bottom: 10,
    position: 'absolute',
  },
});

export {styles};
