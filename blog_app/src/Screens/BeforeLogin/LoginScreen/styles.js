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
    fontFamily: 'Lato-Thin'
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export {styles};
