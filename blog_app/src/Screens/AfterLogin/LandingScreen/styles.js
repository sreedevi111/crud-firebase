import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
container:{
    flex:1,
    backgroundColor:'black'
},
titleContainer:{
    flex:2,
    justifyContent:'center',
    alignItems:'center'
},
heading:{
    color:'yellow',
    fontWeight:'700',
    fontSize:30,

},
quoteIcon:{
    height:120,
    width:120,
    borderRadius:30
},
readmore:{
   backgroundColor:'#245963',
   margin:10,
   justifyContent:'center',
   alignItems:'center'
},
read:{
    color:'#cceb34',
    fontSize:20,
    paddingTop:20,
}
})

export {styles}