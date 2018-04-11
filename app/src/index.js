import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import {BrowserRouter} from 'react-router-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const Root = () => (
  <BrowserRouter>
    <App/>
  </BrowserRouter>
);

ReactDOM.render(
  <Root/>,
  document.getElementById('root')
);

registerServiceWorker();
