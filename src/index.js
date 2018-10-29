import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import throttle from 'lodash/throttle';
import reducer from './reducers';
import { loadState, saveState } from './storage/localStorage.js'
import Root from './Root';

import './index.css';
// import * as serviceWorker from './serviceWorker';

const store = createStore(reducer,
  loadState(),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// persist store to LocalStorage
store.subscribe(throttle(() => {
  saveState({
    dictionaries: store.getState().dictionaries
  });
}, 1000));

ReactDOM.render(<Root store={store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
