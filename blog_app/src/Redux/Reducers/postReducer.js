import {GETPOST, ADDPOST, EDITPOST, DELETEPOST, STATECHANGE} from '../types';

const initValue = {
  post: [],
  loading: false,
  msg: null,
  state: {
    Title: '',
    Name: '',
    Description: '',
    Phone: '',
    Image: '',
  },
};

export const postReducer = (state = initValue, action) => {
  console.log('Action in post', action);

  if (action.type === GETPOST) {
    return {...state, post: action.payload};
  }
  if (action.type === ADDPOST) {
    return {...state, post: action.payload};
  }
  if (action.type == EDITPOST) {
    return {...state, post: action.payload};
  }
  if (action.type == DELETEPOST) {
    return {...state, post: action.payload};
  }
  if (action.type === STATECHANGE) {
    // state.state => object
    // action.payload => object
    state.state = {
      ...state.state,
      ...action.payload,
    };
    return state;
  }

  return state;
};
