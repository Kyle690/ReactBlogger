import {combineReducers} from "redux";
import {reducer as formReducer}from 'redux-form';

import Content from './ContentReducer';
import Auth from './AuthReducer';
const index={
  form:formReducer,
  content:Content,
  auth:Auth
};

export default combineReducers(index);