import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import ShareIcon from './src/Pages/ShareIcon'
import GoogleMaps from './src/Pages/GoogleMaps'

const App = () => {
    return (
      <View style ={styles.mainContainer}>
       {/* <ShareIcon/> */}
       <GoogleMaps/>
       
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