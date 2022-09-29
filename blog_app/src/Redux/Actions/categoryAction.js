import firestore from '@react-native-firebase/firestore'
import { GETCATEGORY } from '../types'

export const getcategories = () =>{
    return dispatch => {
        firestore().collection('Categories').get()
        .then(res =>{
            const categoryList = [];
            res.docs.map(each => {
                categoryList.push({
                    label: each.data().name
                })
                console.log("CL:", categoryList)
            })
            dispatch ({type: GETCATEGORY, payload: categoryList})
        })
        .catch(err =>{
            console.log("Error:", err)
            dispatch({type:GETCATEGORY, payload:[]})
        })
    }
}