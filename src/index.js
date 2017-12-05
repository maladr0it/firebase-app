import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// import registerServiceWorker from './registerServiceWorker';

import chatApp from './reducers';
import App from './App';

const store = createStore(chatApp);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

// registerServiceWorker();
