import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {styles} from './styles';

const LandingScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.heading}>QUOTES LIBRARY</Text>
        <Image
          source={require('../../../Assets/Images/quotepic.png')}
          style={styles.quoteIcon}
        />

        <TouchableOpacity
          style={styles.readmore}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.read}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LandingScreen;
