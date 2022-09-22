import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
<<<<<<< Updated upstream
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
=======
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
>>>>>>> Stashed changes
    mainContainer:{
      flex:1,
      backgroundColor:'white'
    }
  })