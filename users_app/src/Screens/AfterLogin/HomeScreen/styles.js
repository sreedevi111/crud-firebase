import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  title: {
    color: 'black',
  },

  name: {
    color: 'black',
    fontStyle: 'italic',
    fontSize: 10,
  },

  renderContainer: {
    borderWidth: 1,
    width: '100%',
    borderRadius: 20,
    padding: 10,
    borderColor: 'grey',
    paddingVertical: 10,
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: 'white',
  },
});

export default styles;
