import firestore from '@react-native-firebase/firestore'
import { GETPOST, ADDPOST, EDITPOST, DELETEPOST} from '../types'
import {API_URL} from '@env';
import axios from 'axios';


//get
export const getpost = () => {
    return   dispatch => {
        // firestore().collection('Contacts').get()
        // .then(res => {
        //     console.log("Get post in redux >>>", res)
        //     dispatch ({type: GETPOST, payload:'success'})
        // })
        // .catch(err =>{
        //     dispatch ({type: GETPOST, payload: 'error'})
        // })
        axios.get(`${API_URL}/getData`).then((response) => {
            console.log('response from getDatajnnhnhbhbh:', response.data);
      dispatch ({type: GETPOST, payload: response.data.data})
        }).catch((err)=> {
            dispatch ({type: GETPOST, payload: 'error'}) 
        })
    // try {
    //   console.log('response from getData:', response);
    //   dispatch ({type: GETPOST, payload:'success'})
    // } catch {
    //   error => {
    //     dispatch ({type: GETPOST, payload: 'error'}) 
    //   };
    // }
    }
}


//add
export const addpost = () => {
    return dispatch => {
        firestore().collection('Contacts').add()
        .then(res => {
            console.log("Get post in redux >>>", res)
            dispatch ({type: ADDPOST, payload:'success'})
        })
        .catch(err =>{
            dispatch ({type: ADDPOST, payload: 'error'})
        })
    }
}


//edit
export const editpost = () => {
    return dispatch => {
        firestore().collection('Contacts').doc(id).update
        .then(res => {
            console.log("Edit post in redux >>>", res)
            dispatch ({type: EDITPOST, payload:'success'})
        })
        .catch(err =>{
            dispatch ({type: EDITPOST, payload: 'error'})
        })
    }
}
// delete
export const deletepost = (id) => {
    return dispatch => {
        firestore().collection('Contacts').doc(id).delete()
        .then(res => {
            console.log("delete post in redux >>>", res)
            dispatch ({type: DELETEPOST, payload:'success'})
        })
        .catch(err =>{
            dispatch ({type: DELETEPOST, payload: 'error'})
        })
    }
}