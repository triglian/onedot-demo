import {
  VALIDATE_DICTIONARY,
} from '../constants/ActionTypes';
import { validateDictionaryConsistency } from '../validation/';
import { consistencyErrorsPerRow } from '../utils/';

const newDictionary = (state = {}, action) => {
  switch (action.type) {
    case VALIDATE_DICTIONARY:
      const errors = validateDictionaryConsistency(action.payload.rows);
      const errorsPerRow = consistencyErrorsPerRow(errors, action.payload.rows.length);
      return {...action.payload, validationErrors: errorsPerRow}
    default:
      return state;
  }
}

export default newDictionary;