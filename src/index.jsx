import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Switch,
  } from 'react-router-dom';

import { SignIn, SignUp, PickRole } from './auth/views.jsx';
import { Categories, Products } from './core/views.jsx';

import configureStore from './store';

//initialState can be kinda inserted into configureStore
const store = configureStore();

const Header = () => (
    <header id="header" className="header_wrapp clearfix">
        <div className="header_inner claerfix">
            <div className="logo">
                <a href="/">
                    <img src="/static/images/small-logo.png" alt=""/>
                </a>
            </div>
        </div>
    </header>
);

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            props
        }
/*
        this.state = {
            role: null,
            token: null
        }
*/
    }
/*
    componentDidMount() {
        // Doesn't seem like a proper subscription
        this.unsubscribe = store.subscribe(() =>
        this.setState({token: store.getState().token, role : store.getState().role})
    )}

    componentWillUnmount() {
        this.unsubscribe();
    }
*/
    render() {
        if (this.state.token !== null) {
            return <Categories/>
        } else {
            return <SignIn/>
        }
    }
}

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return <main>
            <Router>
                <Switch>
                    <Route exact path='/react_index' component={Index} />
                    <Route path='/pick_role' component={PickRole}/>
                    <Route path='/sign_up' component={SignUp}/>
                    <Route exact path='/categories/' component={Categories}/>
                    <Route path='/categories/:pid/' component={Categories}/>
                    <Route path='/products/:cat_id/' component={Products}/>
                </Switch>
            </Router>
        </main>
    }
}

render(
    <Provider store={store}>
        {/*<Header />*/}
        <Main />
    </Provider>,
    document.getElementById('app')
);