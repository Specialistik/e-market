import React from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider, connect } from 'react-redux';

import PickRole from './src/android/pick-role';
import SignIn from './src/android/sign-in';
import SignUp from './src/android/sign-up';
import IndexContainer from './src/android/index';

import configureStore from './src/store';
export const store = configureStore();

const AppNavigator = StackNavigator({
    Index: { screen: IndexContainer },
    PickRole: { screen: PickRole },
    SignUp: { screen: SignUp },
    SignIn: { screen: SignIn },
});


const AppWithNavigationState = (props) => (
    <AppNavigator
        navigation={{
            dispatch: props.dispatch,
            state: props.nav
        }}
    />
);

const mapStateToProps = state => ({
    nav: state.nav,
});
connect(mapStateToProps)(AppWithNavigationState);

class TheSkladApp extends React.Component {  
    render() {
      return (
        <Provider store={this.store}>
          <AppWithNavigationState />
        </Provider>
      );
    }
  }

AppRegistry.registerComponent('the_sklad', () => TheSkladApp);