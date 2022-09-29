import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
// import { Store } from './src/Redux/store'
import store from './src/Redux/store';
import Navigation from './src/Navigation';

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.mainContainer}>
        <Navigation />
      </View>
     </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});
