export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    const state =  JSON.parse(serializedState);

    // use Date objects
    if (state.dictionaries && state.dictionaries.length > 0) {
      // this is doesn't modify existing redux state so we can
      // update in place
      state.dictionaries = state.dictionaries.map(dictionary => {
        dictionary.createdAt = new Date(dictionary.createdAt);
        dictionary.lastModifiedAt = new Date(dictionary.lastModifiedAt);
        return dictionary
      })
    }
    return state;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};