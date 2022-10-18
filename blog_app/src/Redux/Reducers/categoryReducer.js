import {GETCATEGORY, EDITCATEGORY, NULLMSG, RESET} from '../types';

const initValue = {
  newscategories: [],
  loading: false,
  msg: null,

};

export const categoryReducer = (state = initValue, action) => {
    console.log('Action Category', action);
  if (action.type === GETCATEGORY) {
    return {...state, newscategories: action.payload};
  }

  if(action.type === EDITCATEGORY){
    return {...state, msg: action.payload, loading: false } //success, error
  }

  if(action.type === NULLMSG){
        return {...state, msg: null }
  }

  if(action.type === RESET){
      console.log('doe it work here ???')
        return {...state, newscategories: [],
        loading: false,
        msg: null }
  }




  return state;
};