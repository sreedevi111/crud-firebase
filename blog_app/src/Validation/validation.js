import {Alert} from 'react-native';

const Name = (input) => {
  const Name = input.trim(); //removes whitespaces
  const pattern = /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/;
  const valid = pattern.test(Name);
  return valid;
};

const Description = (input) => {
const Description = input.trim();
const pattern = /^(.|\s)*[a-zA-Z]+(.|\s)*$/;
const valid = pattern.test(Description);
return valid;  
}

const Email = (input) => {
    const Email = input.trim().toLowerCase();
    const pattern =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const valid = pattern.test(Email)
    return valid
}

const Password = (input) => {
    const Password = input.trim();
    const pattern = /^.{6,}$/;
    const valid = pattern.test(Password)
    return valid
}

export const Validation = (names, description, email, password) => {
    // if (!names) return Alert.alert("Please enter valid name")
    // if (!description) return Alert.alert("Please enter valid Description")
    if (!email) return Alert.alert("Please enter valid Email")
    if (!password) return Alert.alert("Please enter Password")

    if(!email(Email)) Alert.alert("....?")
    if(!password(Password)) Alert.alert(".????...?")
}