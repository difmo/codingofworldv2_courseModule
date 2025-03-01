import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { courseReducer } from './Admin/Course/courseReducer';
import { adminVideoReducer } from './Admin/Video/adminVideoReducer';
import { courseDetailsReducer } from './courseDetails/courseDetailsReducer';
import { userVideoReducer } from './User/Video/userVideoReducer';
import { authReducer } from './Auth/authReducer';

const rootReducer = combineReducers({
  course: courseReducer,
  adminVideo: adminVideoReducer,
  courseDetails: courseDetailsReducer,
  userVideo: userVideoReducer,
  auth: authReducer,
});

const customThunk = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }
  return next(action);
};

/* eslint-disable no-underscore-dangle */
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : (f) => f; // Fallback if DevTools is not available
/* eslint-enable no-underscore-dangle */

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(customThunk),
    devTools
  )
);
