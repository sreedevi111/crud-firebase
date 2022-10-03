import firestore from '@react-native-firebase/firestore'
import { GETCATEGORY, EDITCATEGORY, GETPOST, ADDPOST, EDITPOST, DELETEPOST } from '../types'

export const getcategories = () =>{
    return dispatch => {
        firestore().collection('Categories').get()
        .then(res =>{
            const categoryList = [];
            res.docs.map(each => {
                categoryList.push({
                    label: each.data().name
                })
            })
            dispatch ({type: GETCATEGORY, payload: categoryList})
        })
        .catch(err =>{
            console.log("Error:", err)
            dispatch({type:GETCATEGORY, payload:[]})
        })
    }
}

export const getpost = () => {
    return dispatch => {
        firestore().collection('Contacts').get()
        .then(res => {
            console.log("Get post in redux >>>", res)
            dispatch ({type: GETPOST, payload:'success'})
        })
        .catch(err =>{
            dispatch ({type: GETPOST, payload: 'error'})
        })
    }
}