import React from 'react';
import { render } from 'react-dom';
import { bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
  } from 'react-router-dom';

import * as AuthActionCreators from './auth/actions';
import { SignIn, SignUp, PickRole } from './auth/views.jsx';
import { Header, CategoryContainer, ProductsContainer } from './core/views.jsx';
import { Profile } from './profile/views.jsx';

import configureStore from './store';
export const store = configureStore();


class IndexContainer extends React.Component {
    render() {
        if (this.props.token) {
            return <CategoryContainer />
        } else {
            return <SignIn />
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return { actions: bindActionCreators(AuthActionCreators, dispatch) }
}


const mapStateToProps = (state) => {
    return {
        role: state.userReducer['role'],
        token: state.userReducer['token']
    }
}

const IndexCont = connect(
    mapStateToProps, 
    null
)(IndexContainer);

render(
    <Provider store={store}>
        <Router>
            <div>
                <Header />
                <Switch>
                    <Route exact path='/react_index' component={IndexCont} />
                    <Route path='/pick_role' component={PickRole}/>
                    <Route path='/sign_up' component={SignUp}/>
                    <Route path='/logout' component={SignIn}/>

                    <Route exact path='/categories/' component={CategoryContainer}/>
                    <Route exact path='/categories/:pid/' component={CategoryContainer}/>
                    <Route path='/products/:cat_id/' component={ProductsContainer}/>
                </Switch>
            </div>
        </Router>
    </Provider>,
    document.getElementById('app')
);


