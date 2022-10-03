import { combineReducers } from "redux";

import { categoryReducer } from "./categoryReducer";
import { postReducer } from "./postReducer";

const appReducer = combineReducers({
category: categoryReducer,
post: postReducer
})

export default appReducer;