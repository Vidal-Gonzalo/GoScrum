import { combineReducers } from "redux";

import { tasksReducer } from "./tasksReducers";

const rootReducer = combineReducers({
  tasksReducer,
});

export default rootReducer;
