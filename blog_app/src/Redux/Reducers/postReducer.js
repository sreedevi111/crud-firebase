import {GETPOST, ADDPOST, EDITPOST, DELETEPOST, STATECHANGE} from '../types';

const initValue = {
  post: [],
  loading: false,
  msg: null,
  Title: '',
  Name: '',
  Description: '',
  Phone: '',
  Image: '',
  catName:'',
  catID:''
};

export const postReducer = (state = initValue, action) => {
  // console.log('Action in post', action);

  if (action.type === GETPOST) {
    return {...state, post: action.payload};
  }
  // if (action.type === ADDPOST) {
  //   return {...state, post: action.payload};
  // }
  // if (action.type == EDITPOST) {
  //   return {...state, post: action.payload};
  // }
  if (action.type == DELETEPOST) {
    console.log("DELETE RED::::", state, action)
    return {...state};
  }
  if (action.type === STATECHANGE) {
    // state.state => object
    // action.payload => object
    // state.state = {
    //   ...state.state,
    //   ...action.payload,
    // };
    // console.log("STATECHANGE:::", state)
    // return state;
    return {...state, ...action.payload};
  }

  return state;
};
