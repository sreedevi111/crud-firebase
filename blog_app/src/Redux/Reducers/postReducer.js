import {GETPOST,DELETEPOST, STATECHANGE, LOADER} from '../types';

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

  if (action.type === GETPOST) {
    return {...state, post: action.payload};
  }
  if (action.type == DELETEPOST) {
    console.log("DELETE RED::::", state, action)
    return {...state};
  }

  if (action.type == LOADER) {
    return { ...state, loading: true}
  }

  

  return state;
};