import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const ASPECT_RATIO = windowWidth/windowHeight;
const LATITUDE_DElTA = 0.0992;
const LONGITUDE_DELTA = LATITUDE_DElTA * ASPECT_RATIO
const GoogleMaps = () => {

const initialRegion = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: LATITUDE_DElTA,
  longitudeDelta: LONGITUDE_DELTA
}

const [position, setPosition] = useState({initialRegion});
const defaultValue ='';
const [ coordinates, setCoordinates] = useState(defaultValue)


// const applyNewValue = (newVal) => {
// console.log('new Value:', newVal)
// setCoordinates(newVal)
// }

//! CHECK ERROR IN DEVICE [Error while updating property 'region' of a view managed by : AIRMap #140]



useEffect(()=>{
  console.log("Coordinates::", coordinates)
}, [coordinates]) 

  return (
    <View>
    <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={position}
       initialRegion={initialRegion}
       onRegionChange={setCoordinates} 
     >
      <Marker coordinate={
       { latitude: 37.78825,
        longitude: -122.4324,}
      }/>
     </MapView>
    </View>
  )
}

export default GoogleMaps

const styles = StyleSheet.create({
    map: { 
        width: windowWidth,
        height: windowHeight
      },
})