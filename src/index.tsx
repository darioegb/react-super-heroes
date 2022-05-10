import React from 'react';
import ReactDOM from 'react-dom';

import './styles.scss';
import App from './App';
import SystemTheme from 'config/SystemTheme';
import reportWebVitals from './reportWebVitals';
import './config/i18n';
import './config/firebase';
import './utils/yupLocale';
import { AppProvider } from 'context';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <SystemTheme>
        <App />
      </SystemTheme>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
