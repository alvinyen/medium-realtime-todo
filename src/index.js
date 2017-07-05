import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import store from './redux/store';

import { MuiThemeProvider } from 'material-ui/styles';
import App from './containers/App.jsx';

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>, 
  document.getElementById('root'));
