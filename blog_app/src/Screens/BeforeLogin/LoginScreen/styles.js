import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loginContainer: {
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  LoginText: {
    color: 'black',
    fontSize: 30,
    left: '40%',
    fontFamily: 'Aboreto-Regular'
  },
  conditionText: {
    color: 'black',
    fontFamily: 'Roboto',
    fontSize: 15,
    flexWrap: 'wrap',
    height: 50,
    width: 284,
    marginHorizontal: 70,
  },
  email_container: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    borderColor: '#A6A6A6',
    borderBottomWidth: 1,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  email: {
    color: 'black',
  },
  password: {
    color: 'black',
  },
  password_container: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    borderColor: '#A6A6A6',
    borderBottomWidth: 1,
    marginHorizontal: 20,
  },
  error_msg: {
    color: 'red',
    fontSize: 10,
    paddingLeft: 20,
  },
  submit_button: {
    marginTop: 20,
    height: 56,
    backgroundColor: '#333333',
    borderRadius: 16,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  login_button:{
    fontSize: 18, 
    lineHeight: 20, 
    color: '#FCFCFC' 
  },
 checkbox:{
  alignSelf:'center',
  padding:20,
  left:50
  
 },
 checkboxContainer: {
  flexDirection: "row",
  marginBottom: 20,
  justifyContent:'center',
  alignItems:'center',
  marginVertical:20,
  marginHorizontal:40
},

});

export {styles};
