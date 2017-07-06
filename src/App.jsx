import React from 'react';
import thunk from 'redux-thunk';

import { applyMiddleware, combineReducers, createStore } from 'redux';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import { routerMiddleware, routerReducer, syncHistoryWithStore } from 'react-router-redux';

import MainTemplate from './templates/main/Main';

import AboutPage from './pages/about/About';
import HomePage from './pages/home/Home';
import TemplatesPage from './pages/templates/Templates';

import './App.sass';

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
      <Route path="templates" component={TemplatesPage} />
    </Route>
  </Router>,
  document.getElementById('app')
);
