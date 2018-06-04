import React from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Switch,
  } from 'react-router-dom';

import PickRole from './auth/pick-role.jsx';
import SignIn from './auth/sign-in.jsx';
import SignUp from './auth/sign-up.jsx';

import { CategoryContainer } from "./core/categories.jsx";
import { ProductsContainer } from "./core/products.jsx";
import Header from "./core/header.jsx"


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

render(
    <Provider store={store}>
        <Router>
            <div>
                <Header />
                <Switch>
                    <Route exact path='/react_index' component={IndexCont} />
                    <Route path='/pick_role' component={PickRole}/>
                    <Route path='/sign_up' component={SignUp}/>
                    <Route path='/sign_in' component={SignIn}/>

                    <Route exact path='/categories/' component={CategoryContainer}/>
                    <Route exact path='/categories/:pid/' component={CategoryContainer}/>
                    <Route path='/products/:cat_id/' component={ProductsContainer}/>
                </Switch>
            </div>
        </Router>
    </Provider>,
    document.getElementById('app')
);


