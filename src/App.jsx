import firebase from 'firebase';
import React from 'react';
import thunk from 'redux-thunk';

import { applyMiddleware, combineReducers, createStore } from 'redux';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import { routerMiddleware, routerReducer, syncHistoryWithStore } from 'react-router-redux';

import MainTemplate from './templates/main/Main';

import AboutPage from './pages/about/About';
import HomePage from './pages/home/Home';
import LoginPage from './components/login/Login';
import TemplatePage from './pages/template/Template';
import TemplatesPage from './pages/templates/Templates';

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
    routing: routerReducer
  }),
  applyMiddleware(
    thunk,
    router
  )
);

// if path changes in url, it changes in app too
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Router history={history}>
    <Route path="/" component={MainTemplate}>
      <IndexRoute component={HomePage} />
      <Route path="about" component={AboutPage} />
      <Route path="login" component={LoginPage} />
      <Route path="templates" component={TemplatesPage} />
      <Route path="templates/:listType" component={TemplatePage} />
    </Route>
  </Router>,
  document.getElementById('app')
);
