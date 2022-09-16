import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  name: {
    marginTop: 10,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    color: 'black',
    marginBottom: 20,
  },
  title: {
    marginTop: 10,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    color: 'black',
    paddingVertical: 10,
  },
  imagePicker:{
    width:250,
    height:250,
    borderRadius:30,
    borderColor: 'grey',
    borderWidth: 1,
    justifyContent:'center',
    alignItems:'center'

  },
  imageUpload:{
width:240,
height:240,
// margin:30,
// alignItems:'center',
borderRadius:30,


  },
  button:{
    width:100,
    height:50,
    borderColor: 'blue',
    borderWidth: 1,
    marginTop:20,
    marginHorizontal:50,
    left:50,
    borderRadius:30,
    backgroundColor:'grey',
    justifyContent:'center',
    alignItems:'center'
  },
  categorySelection:{
    backgroundColor:'#1e106b',
   
    height: 40,
    width: 120,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    left:20,
    margin:5
  },
  categorySelectionText:{
    color:'white',

  }
});

export {styles};
