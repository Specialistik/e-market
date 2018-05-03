import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
  } from 'react-router-dom';

import { SignIn, SignUp, PickRole } from './auth/views.jsx';
import { Categories, Products } from './core/views.jsx';
import ROLES from './auth/actions';
import configureStore from './store';

const store = configureStore();

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            props
        }
    }

    render() {
        return <header id="header" className="header_wrapp clearfix">
            <div className="header_inner claerfix">
                <div className="logo">
                    <a href="/">
                        <img src="/static/images/small-logo.png" alt=""/>
                    </a>
                </div>
                {this.state.role !== null && this.state.role in ['customer', 'manager'] ?
                    <div className="basket_wrapp">
                        <a href="/basket" className="basket_box">
                            <i className="fa fa-shopping-basket" aria-hidden="true"></i>
                            <span className="basket_item">14</span>
                        </a>

                        <div className="basket_box_count">
                            <span className="basket_count" id="basket">88</span> руб
                        </div>
                    </div> :''}

                {this.state.role !== null && this.state.role === 'manager' ?
                    <div className="basket_wrapp">
                        <a href="/basket" className="basket_box">
                            <i className="fa fa-shopping-basket" aria-hidden="true"></i>
                            <span className="basket_item">14</span>
                        </a>

                        <div className="basket_box_count">
                            <span className="basket_count">88</span> руб
                        </div>

                    </div> :''}

                <Link to='/logout' className="out_btn">
                    Выйти
                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                </Link>
            </div>
        </header>
    }
};

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            props
        }
    }

    render() {
        if (this.state.token !== null) {
            return <Categories/>
        } else {
            return <SignIn/>
        }
    }
}

render(
    <Provider store={store}>
        <Router>
            <div>
                <Header />
                <Switch>
                    <Route exact path='/react_index' component={Index} />
                    <Route path='/pick_role' component={PickRole}/>
                    <Route path='/sign_up' component={SignUp}/>
                    <Route path='/logout' component={Categories}/>

                    <Route exact path='/categories/' component={Categories}/>
                    <Route exact path='/categories/:pid/' component={Categories}/>
                    <Route path='/products/:cat_id/' component={Products}/>
                </Switch>
            </div>
        </Router>
    </Provider>,
    document.getElementById('app')
);