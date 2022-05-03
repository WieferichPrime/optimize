import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './redux/rootReducer';
import logger from 'redux-logger';

const store = createStore(rootReducer, applyMiddleware(logger));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}><App /></Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('app')
);


