import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Navigation from './src/Navigation'


const App = () => {
  return (
    <View style ={styles.mainContainer}>
      <Navigation />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor:'white'
  }
})