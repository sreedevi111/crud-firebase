import firestore from '@react-native-firebase/firestore';
import {
  GETPOST,
  ADDPOST,
  EDITPOST,
  DELETEPOST,
  STATECHANGE,
  LOADER,
} from '../types';
import {API_URL} from '@env';
import axios from 'axios';
import Moment from 'moment';

// state change
export const statechangeaction = payload => {
  return dispatch => {
    dispatch({type: STATECHANGE, payload: payload});
  };
};

export const loadingchange = () => {
  return dispatch => {
    dispatch({type: LOADER});
  };
};


//get
export const getpost = () => {
  return dispatch => {
    axios
      .get(`${API_URL}/getData`)
      .then(response => {
        dispatch({type: GETPOST, payload: response.data.data});
      })
      .catch(err => {
        dispatch({type: GETPOST, payload: 'error'});
      });
  };
};

//add
export const addpost = state => {
  console.log('addpost::::::::', state);
  return dispatch => {
    var storedata = {
      Title: state.Title,
      Name: state.Name,
      Image,
      Description: state.Description,
      Phone: state.Phone,
      catName: state.catName || 'test',
      catID: state.catID || 'test',
      time: Moment().format('h:mm:ss a'),
      timeCreated: Moment().unix(),
      timeinHuman: Moment().format('DD-MM-YYYY'),
    };
    console.log('Stored val::', storedata);
    firestore()
      .collection('Contacts')
      .add(storedata)
      .then(res => {
        console.log('Add::::::: post in redux >>>', res);
        dispatch({type: ADDPOST, payload: {}});
      })
      .catch(err => {
        dispatch({type: ADDPOST, payload: 'error'});
      });
  };
};

//edit
export const editpost = state => {
  console.log('editting done', state);
  return dispatch => {
    firestore()
      .collection('Contacts')
      .doc(state.id)
      .set(
        {
          Title: state.Title || 'test',
          Name: state.Name || 'test',
          Description: state.Description || 'test',
          Phone: state.Phone || 'test',
          catName: state.catName || 'test',
          catID: state.catID || 'test',
          time: Moment().format('h:mm:ss a'),
          timeCreated: Moment().unix(),
          timeinHuman: Moment().format('DD-MM-YYYY'),
        },
        {merge: true},
      )
      .then(() => {
        console.log('Edit post in redux >>>');
        dispatch({type: EDITPOST, payload: 'success'});
      })
      .catch(err => {
        console.log('err', err);
        dispatch({type: EDITPOST, payload: 'error'});
      });
  };
};
// delete
export const deletepost = id => {
  return dispatch => {
    firestore()
      .collection('Contacts')
      .doc(id)
      .delete()
      .then(res => {
        console.log('delete post in redux >>>', res);
        dispatch({type: DELETEPOST, payload: []});
      })
      .catch(err => {
        dispatch({type: DELETEPOST, payload: 'error'});
      });
  };

};
