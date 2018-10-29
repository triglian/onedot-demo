import dictionaryData from '../data/dictionaryData';
import {
  ADD_DICTIONARY,
  UPDATE_DICTIONARY,
  DELETE_DICTIONARY
} from '../constants/ActionTypes';

const dictionaries = (state = dictionaryData, action) => {
  switch (action.type) {
    case ADD_DICTIONARY:
      return [...state, action.payload];
    case UPDATE_DICTIONARY:
      return state.map((dictionary, index) => {
        if (dictionary.uid === action.payload.uid) {
          return {...action.payload}
        }
        return dictionary;
      }) 
    case DELETE_DICTIONARY:
      return state.filter(dictionary => dictionary.uid !== action.payload.uid);
    default:
      return state;
  }
};

export default dictionaries;