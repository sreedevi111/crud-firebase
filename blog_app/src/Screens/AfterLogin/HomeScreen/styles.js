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
    width: 240,
    height: 180,
    resizeMode: 'cover',
  },
  comments: {
    color: 'blue',
  },

  renderContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    paddingVertical: 10,
    flexDirection: 'row',
  },
  details: {
    flex: 2,
  },
  icons: {
    flex: 1,
    alignItems: 'center',
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
