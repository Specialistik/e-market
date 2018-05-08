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
import { Categories, Products } from './core/views.jsx';
import { Profile } from './profile/views.jsx';

import * as AuthActionCreators from './auth/actions'

import configureStore from './store';
export let store = configureStore();

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { props }
    }

    render() {
        return <header id="header" className="header_wrapp clearfix">
            <div className="header_inner claerfix">
                <div className="logo">
                    <Link to="/">
                        <img src="/static/images/small-logo.png" alt=""/>
                    </Link>
                </div>

                <div className="header_right_box">
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

                    <Link to='/profile/' href="/profile/" className="wrapp_company_logo clearfix">
                        <span className="company_logo">
                            <img src="/static/images/icons/user-icon.png" alt=""/>
                        </span>

                        <span className="company_name">
                            Моя компания
                        </span>
                    </Link>

                    <Link to='/logout' className="out_btn">
                        Выйти
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </Link>
                </div>
            </div>
        </header>
    }
};

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = { props }
    }

    render() {
        console.log('props', this.props, 'state', this.state);
        return 
        {this.state.role !== 'supervisor' ?
            <div>
                <button class="navigation_btn">
                    <i class="fa fa-bars" aria-hidden="true"></i>
                </button> 
                <nav id="nav" class="navigation">
                    <div class="user_navigation">
                        {this.state.role in ('customer', 'manager') ?
                            <div class="basket_wrapp">
                                <a href="/basket" class="basket_box">
                                    <i class="fa fa-shopping-basket" aria-hidden="true"></i>
                                    <span class="basket_item">14</span>
                                </a>
        
                                <div class="basket_box_count">
                                    <span class="basket_count">88</span> руб
                                </div>
        
                            </div>
                        :''
                    
                        }
                    </div>
                </nav>
            </div>
        :''
        }
    }
}

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = { props }
        /*
        this.state = { 
            role: state.role,
            token: state.token
        };
        */
        //const {dispatch} = props;
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            console.log('the state ', this.state);
            console.log('props are ', props);
            this.setState({
                role: this.state.role,
                token: this.state.token
            },);
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        let { dispatch } = this.props;
        let boundActionCreators = bindActionCreators(AuthActionCreators, dispatch);
        if (this.state.hasOwnProperty('token')) {
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

function mapStateToProps(state) {
    return {
        role: state.role,
        token: state.token,
    }
}
/*
export default connect(mapStateToProps, {
    AuthActionCreators
})(Index);
*/