import firestore from '@react-native-firebase/firestore';
import {GETPOST, ADDPOST, EDITPOST, DELETEPOST} from '../types';
import {API_URL} from '@env';
import axios from 'axios';
import Moment from 'moment';

//get
export const getpost = () => {
  return dispatch => {
    axios
      .get(`${API_URL}/getData`)
      .then(response => {
        console.log('response from getpost redux:', response.data);
        dispatch({type: GETPOST, payload: response.data.data});
      })
      .catch(err => {
        dispatch({type: GETPOST, payload: 'error'});
      });
  };
};

//add
export const addpost = state => {
  return dispatch => {
    firestore()
      .collection('Contacts')
      .add({
        Title: state.Title,
        Name: state.Name,
        Description: state.Description,
        Phone: state.Phone,
        catName: catName[0].label,
        catID: value,
        timeCreated: Moment().unix(),
        timeinHuman: Moment().format('DD-MM-YYYY'),
      })
      .then(res => {
        console.log('Get post in redux >>>', res);
        dispatch({type: ADDPOST, payload: {}});
      })
      .catch(err => {
        dispatch({type: ADDPOST, payload: 'error'});
      });
  };
};

//edit
export const editpost = () => {
  return dispatch => {
    firestore()
      .collection('Contacts')
      .doc(id)
      .update.then(res => {
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
        dispatch({type: DELETEPOST, payload: 'success'});
      })
      .catch(err => {
        dispatch({type: DELETEPOST, payload: 'error'});
      });
  };
};
