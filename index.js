import React, { AppRegistry, View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import { PickRole } from './src/android/pick_role.jsx';
import { SignIn } from './src/android/sign-in.jsx';
import { Categories } from './src/android/categories.jsx';

import configureStore from './src/store';
export const store = configureStore();

class IndexContainer extends React.Component {
    render() {
        if (this.props.token) {
            return <Categories />
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
            <Router>
                <View>
                    <Header />
                    <Switch>
                        <Route exact path='/react_index' component={IndexCont} />
                        <Route path='/pick_role' component={PickRole}/>
                        {/*
                        <Route path='/sign_up' component={SignUp}/>
                        <Route path='/sign_in' component={SignIn}/>
                        <Route path='/log_out' component={Logout}/>

                        <Route exact path='/categories/' component={Categories}/>
                        <Route exact path='/categories/:pid/' component={Categories}/>
                        <Route path='/products/:cat_id/' component={Products}/>
                        */}
                    </Switch>
                </View>
            </Router>
        </Provider>
    }
}

AppRegistry.registerComponent('theSkladMobile', () => TheSkladMobile);