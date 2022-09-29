import {applyMiddleware, createStore, compose} from 'redux'
import thunk from 'redux-thunk'

import appReducer from './Reducers'

var composeEnhancers = compose
if(__DEV__){
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}


const store = createStore(appReducer, composeEnhancers(applyMiddleware(thunk)))
export default store