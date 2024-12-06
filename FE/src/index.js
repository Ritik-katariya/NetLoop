import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { NextUIProvider } from '@nextui-org/react';

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <NextUIProvider>

        <App />
      </NextUIProvider>
    </Provider>
  </React.Fragment>,
  document.getElementById('root')
);