import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import userReducer from 'reducers/userReducer.js'

const store = createStore(userReducer)
store.subscribe(() => console.log(store.getState()))
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);