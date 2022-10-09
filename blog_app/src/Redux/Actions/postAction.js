import firestore from '@react-native-firebase/firestore';
import {GETPOST, ADDPOST, EDITPOST, DELETEPOST, STATECHANGE} from '../types';
import {API_URL} from '@env';
import axios from 'axios';
import Moment from 'moment';

// state change
export const statechangeaction = payload => {
  return dispatch => {
    console.log('dcsdfsdvsdvfdbdfvdfvsdc payload:::', payload);
    dispatch({type: STATECHANGE, payload: payload});
  };
};

//get
export const getpost = () => {
  return dispatch => {
    console.log('getPost inside :::::::');
    axios
      .get(`${API_URL}/getData`)
      .then(response => {
        // console.log('response from getpost redux:', response.data);
        dispatch({type: GETPOST, payload: response.data.data});
      })
      .catch(err => {
        dispatch({type: GETPOST, payload: 'error'});
      });
  };
};

//add
export const addpost = state => {
  // state = state.state
  console.log('addpost::::::::', state);
  return dispatch => {
    var storedata = {
      Title: state.Title, 
      Name: state.Name,
      Description: state.Description,
      Phone: state.Phone,
      catName: state.label ||'test',
      catID: state.value ||'test',
      timeCreated: Moment().unix(),
      timeinHuman: Moment().format('DD-MM-YYYY'),
    }
    console.log("Stored val::", storedata)
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
  return dispatch => {
    firestore()
      .collection('Contacts')
      .doc(state.id)
      .update({
        Title: state.Title || "test",
        Name: state.Name|| "test",
        Description: state.Description|| "test",
        Phone: state.Phone|| "test",
        catName: state.label|| "test",
        catID: state.value|| "test",
        timeCreated: Moment().unix(),
        timeinHuman: Moment().format('DD-MM-YYYY'),
      }).then(res => {
        console.log('Edit post in redux >>>', res);
        dispatch({type: EDITPOST, payload: 'success'});
      })
      .catch(err => {
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
