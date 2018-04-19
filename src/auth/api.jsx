// file: src/util/Auth.js
import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import store from '../store.jsx';
import { setToken } from '../actions/index.jsx'
import { Route, Redirect } from 'react-router';

export function InvalidCredentialsException(message) {
    this.message = message;
    this.name = 'InvalidCredentialsException';
}

export function login(username, password) {
  return axios
    .post('/api/sign_in/', {
      username,
      password
    })
    .then(function (response) {
      store.dispatch(setToken(response.data.token));
      return <Redirect to="/categories/"/>;
    })
    .catch(function (error) {
      // raise different exception if due to invalid credentials
      if (_.get(error, 'response.status') === 400) {
        throw new InvalidCredentialsException(error);
      }
      throw error;
    });
}

export function loggedIn() {
    //console.log(store.getState().token);
    return store.default.getState().token == null;
}

export function register(company_name, inn, password, email, phone) {
    return axios
    .post('/api/sign_up/', {
        company_name,
        inn,
        password,
        email,
        phone,
    })
    .then(function (response) {
        login(email, password);
    //store.dispatch(setToken(response.data.token));
    })
    .catch(function (error) {
    // raise different exception if due to invalid credentials
    if (_.get(error, 'response.status') === 400) {
        throw new InvalidCredentialsException(error);
    }
    throw error;
    });
}