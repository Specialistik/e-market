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

import { SignIn, SignUp, PickRole } from './auth/views.jsx';
import { Header, Categories, Products } from './core/views.jsx';
import { Profile } from './profile/views.jsx';

import configureStore from './store';
export const store = configureStore();

/*
const IndexContainer = props => {
    return props.hasOwnProperty('token') && props.token ? render(<Categories />) : render(<SignIn />)
}
*/

class IndexContainer extends React.Component {
    render() {
        console.log('index props are ', this.props);
        //if (this.props.hasOwnProperty('token')) {
        if (this.props.hasOwnProperty('token') && this.props.token) {
            return <Categories />
        } else {
            return <SignIn />
        }
    }
}


const mapStateToProps = (state) => {
    return {
        role: state.role,
        token: state.token,
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

                    <Route exact path='/categories/' component={Categories}/>
                    <Route exact path='/categories/:pid/' component={Categories}/>
                    <Route path='/products/:cat_id/' component={Products}/>
                </Switch>
            </div>
        </Router>
    </Provider>,
    document.getElementById('app')
);


