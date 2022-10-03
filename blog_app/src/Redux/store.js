import {applyMiddleware, createStore, compose} from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

import appReducer from './Reducers'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  }
  

var composeEnhancers = compose
if(__DEV__){
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}


const persistedReducer = persistReducer(persistConfig, appReducer)

const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)))
export let persistor = persistStore(store)


export default store