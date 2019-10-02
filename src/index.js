import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";

import './css/main.css';
import App from './components/App';

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={App} />
        <Redirect to='/' />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

