import {GETCATEGORY, EDITCATEGORY, NULLMSG} from '../types';

const initValue = {
  newscategories: [],
  loading: false,
  msg: null,
 
};

export const categoryReducer = (state = initValue, action) => {
  // console.log('Action Category', action);
  if (action.type === GETCATEGORY) {
    return {...state, newscategories: action.payload};
  }

  if(action.type === EDITCATEGORY){
    return {...state, msg: action.payload, loading: false } //success, error
  }

  if(action.type === NULLMSG){
        return {...state, msg: null }
  }

  


  return state;
};
