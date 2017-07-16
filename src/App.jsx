import firebase from 'firebase';
import React from 'react';
import thunk from 'redux-thunk';

import { applyMiddleware, combineReducers, createStore } from 'redux';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import { routerMiddleware, routerReducer, syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';

import MainTemplate from './templates/main/Main';

import AboutPage from './pages/about/About';
import BrowsePage from './pages/browse/Browse';
import HomePage from './pages/home/Home';
import LoginPage from './components/login/Login';
import TemplatePage from './pages/template/Template';

import modalReducer from './reducers/modal';
import userReducer from './reducers/user';

import './App.sass';

firebase.initializeApp({
  apiKey: 'AIzaSyDwSND_9KKvt5ykZn23kto3SOG1kNzQTi8',
  authDomain: 'to-do-templates.firebaseapp.com',
  databaseURL: 'https://to-do-templates.firebaseio.com',
  projectId: 'to-do-templates',
  storageBucket: 'to-do-templates.appspot.com',
  messagingSenderId: '337315917027'
});

const router = routerMiddleware(browserHistory);

const store = createStore(
  combineReducers({
    modal: modalReducer,
    routing: routerReducer,
    user: userReducer
  }),
  applyMiddleware(
    thunk,
    router
  )
);

// if path changes in url, it changes in app too
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router
      history={history}
      onUpdate={() => {
        window.scrollTo(100, 100);
        window.scrollTo(0, 0);
      }}
    >
      <Route path="/" component={MainTemplate}>
        <IndexRoute component={HomePage} />
        <Route path="about" component={AboutPage} />
        <Route path="browse" component={BrowsePage} />
        <Route path="login" component={LoginPage} />
        <Route path="templates/:listType" component={TemplatePage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
