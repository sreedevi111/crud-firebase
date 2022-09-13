import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Pagination from './Extras/Pagination'

const App = () => {
  return (
    <View style={styles.mainContainer}>
     <Pagination />
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