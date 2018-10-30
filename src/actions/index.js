import * as types from '../constants/ActionTypes';

export const addDictionary = payload => ({ type: types.ADD_DICTIONARY, payload });
export const validateDictionary = payload => {
  return ({ type: types.VALIDATE_DICTIONARY, payload })
};
export const clearValidatedDictionary = payload => ({ type: types.CLEAR_VALIDATED_DICTIONARY });
export const updateDictionary = payload => ({ type: types.UPDATE_DICTIONARY, payload });
export const deleteDictionary = payload => ({ type: types.DELETE_DICTIONARY, payload });

