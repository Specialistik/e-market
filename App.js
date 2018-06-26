import React from 'react';
import { AppRegistry, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Provider, connect } from 'react-redux';
//import Styles from './src/android/styles';

import PickRole from './src/android/pick-role';
import SignIn from './src/android/sign-in';
import SignUp from './src/android/sign-up';
//import IndexContainer from './src/android/index';

import configureStore from './src/store';
export const store = configureStore();
const AppNavigator = createStackNavigator({
    PickRole: PickRole,
    SignUp: SignUp,
    SignIn: SignIn,
}, { initialRouteName: 'SignIn'});

/*
const AppNavigator = createStackNavigator({
    PickRole: { screen: PickRole },
    SignUp: { screen: SignUp },
    SignIn: { screen: SignIn },
}, { initialRouteName: 'SignIn'});
*/

const AppWithNavigationState = (dispatch, nav) => (
    <AppNavigator
        state={nav}
        dispatch={dispatch}
    />
);

class TheSkladApp extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        ////style={Styles}
        return <Provider store={store}>
            <View>
                <AppWithNavigationState/>
            </View>
        </Provider>
    }
}

const mapStateToProps = state => ({
    nav: state.nav,
});
connect(mapStateToProps)(AppWithNavigationState);

AppRegistry.registerComponent('the_sklad', () => TheSkladApp);