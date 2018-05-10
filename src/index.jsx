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
export const store = configureStore();

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
                    {this.props.role !== null && this.props.role in ['customer', 'manager'] ?
                    <div className="basket_wrapp">
                        <a href="/basket" className="basket_box">
                            <i className="fa fa-shopping-basket" aria-hidden="true"></i>
                            <span className="basket_item">14</span>
                        </a>

                        <div className="basket_box_count">
                            <span className="basket_count" id="basket">88</span> руб
                        </div>
                    </div> :''}

                    {this.props.role !== null && this.props.role === 'manager' ?
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
        return this.props.role !== 'supervisor' ?
            <div>
                <button className="navigation_btn">
                    <i className="fa fa-bars" aria-hidden="true"></i>
                </button> 
                <nav id="nav" className="navigation">
                    <div className="user_navigation">
                        {this.state.role in ('customer', 'manager') ?
                            <div className="basket_wrapp">
                                <a href="/basket" className="basket_box">
                                    <i className="fa fa-shopping-basket" aria-hidden="true"></i>
                                    <span className="basket_item">14</span>
                                </a>
        
                                <div className="basket_box_count">
                                    <span className="basket_count">88</span> руб
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

class IndexContainer extends React.Component {
    componentDidMount() {
        console.log('index container was mounted');
        this.unsubscribe = store.subscribe(() => {
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

        const { todos, dispatch } = this.props;
        console.log('index rerendered, here are the props', this.props);
        if (store.getState().hasOwnProperty('token')) {
            return <Categories token={store.getState().token} role={store.getState().role} />
        } else {
            return <SignIn token={store.getState().token} role={store.getState().role} />
     
        }
    }
}

const mapStateToProps = state => {
    return {
        role: state.role,
        token: state.token,
    }
}

const mapDispatchToProps = dispatch => {
    return { actions: bindActionCreators(AuthActionCreators, dispatch) }
}

let IndexCont = connect(
    mapStateToProps, 
    mapDispatchToProps
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


