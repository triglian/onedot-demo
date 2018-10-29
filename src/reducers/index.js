import { combineReducers } from 'redux'
import dictionaries from './dictionaries';
import validatedDictionary from './validatedDictionary';

export default combineReducers({
  dictionaries,
  validatedDictionary
});