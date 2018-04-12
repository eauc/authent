import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import App from './components/App';

import {applyMiddleware, createStore, combineReducers, compose} from 'redux';
import thunk from "redux-thunk";
import {reducer as formReducer} from 'redux-form';
import {Provider} from 'react-redux';

import reducers from "./reducers";

import registerServiceWorker from './registerServiceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    ...reducers,
    form: formReducer,
  }),
  composeEnhancers(
    applyMiddleware(
      thunk
    )
  )
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(
  <Root/>,
  document.getElementById('root')
);

registerServiceWorker();
