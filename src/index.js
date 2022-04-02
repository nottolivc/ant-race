import React from 'react';
import ReactDOM from 'react-dom';
import { createStore,  applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './reducers';
import logger from 'redux-logger';
import App from './App';

const store = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(logger),
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  )
);


ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root'),
);