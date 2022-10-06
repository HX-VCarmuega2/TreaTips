import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import  { Provider } from 'react-redux';
import store from '../src/redux/store';
import dotenv from 'dotenv';
import axios from 'axios';
import {Auth0Provider} from '@auth0/auth0-react'

dotenv.config()
console.log(process.env.REACT_APP_CLIENT_ID)
axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3001'
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider domain={process.env.REACT_APP_AUTH0_DOMAIN} clientId={process.env.REACT_APP_CLIENT_ID} redirectUri={window.location.origin}>
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
