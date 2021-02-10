/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import AppComponent from './src/views';
import { Provider } from 'react-redux';
import store from './src/store';
import { veryState } from './src/store/AplicationAction';
import RouteContainer from './src/route'

export default class App extends Component {
  render() {
    store.dispatch(veryState());
    return (
      <Provider store={store}>
        <RouteContainer>
            <AppComponent />
        </RouteContainer>
      </Provider>
    );
  }
}
