import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  comments: {
    color: 'blue',
  },

  renderContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    paddingVertical:10,
    
  },
});

export {styles};
