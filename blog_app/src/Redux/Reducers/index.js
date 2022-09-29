import { combineReducers } from "redux";

import { categoryReducer } from "./categoryReducer";
// import { postReducer } from "./postReducer";

const appReducer = combineReducers({
category: categoryReducer,
// postReducer
})

export default appReducer;