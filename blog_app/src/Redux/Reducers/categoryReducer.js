import {GETCATEGORY} from '../types';

const initValue = {
  newscategories: [],
  loading: false,
  msg: null,
};

export const categoryReducer = (state = initValue, action) => {
  console.log('Action', action);
  if (action.type === GETCATEGORY) {
    return {...state, newscategories: action.payload};
  }

  return state;
};
