import 'promise-polyfill/src/polyfill';
import 'rc-slider/assets/index.css';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'whatwg-fetch';

import Page from './components/Page';
import './main.scss';
import store from './state/store';

const tree = (
  <Provider store={store}>
    <Page />
  </Provider>
);

ReactDOM.render(tree, document.getElementById('root'));
