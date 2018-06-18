import React from 'react';
import { AppRegistry, View, StyleSheet } from 'react-native';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import {
    NativeRouter,
    Route,
    Switch
} from 'react-router-native';

import PickRole from './src/android/pick-role';
import SignIn from './src/android/sign-in';
//import Categories from './src/android/'

import configureStore from './src/store';
export const store = configureStore();

class IndexContainer extends React.Component {
    render() {
        if (this.props.token) {
            return <SignIn /> //<Categories />
        } else {
            return <SignIn />
        }
    }
}

const mapStateToProps = (state) => {
    return {
        role: state.userReducer['role'],
        token: state.userReducer['token']
    }
};

const IndexCont = connect(
    mapStateToProps,
    null
)(IndexContainer);


class TheSkladMobile extends React.Component {
    render() {
        return <Provider store={store}>
            <NativeRouter initialEntries={['/pick_role']}>
                <View>
                    <PickRole />
                    <Switch>
                        <Route exact path='/index' component={IndexCont} />
                        <Route path='/pick_role' component={PickRole}/>
                    </Switch>
                </View>
            </NativeRouter>
        </Provider>

    }
}

AppRegistry.registerComponent('the_sklad', () => TheSkladMobile);