import firestore from '@react-native-firebase/firestore'
import { GETCATEGORY, EDITCATEGORY } from '../types'

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

export const editCategory = ({ label, id }) => {
    return dispatch => {
          firestore().collection('Categories').doc(id).update({ name: label })
          .then(()=> {
                dispatch({ type: EDITCATEGORY, payload: 'success' })
          }).catch(error => {
              dispatch({ type: EDITCATEGORY, payload: 'error' })
          })
    }
}


