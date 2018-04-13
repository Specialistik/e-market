import React from 'react';
import {render} from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { SIGN_UP } from '../../config/Api';
import PickRole from 'core';

const {
    Switch,
    Route,
} = ReactRouterDOM;

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

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                token: get_auth_token()
                role: 'consume the role',
            }
        };
    }

    render() {
        <main>
            <Switch>
                <Route exact path='/' component={PickRole}/>
                <Route path='/sign_in' component={Sign_in}/>
                <Route path='/sign_up' component={Sign_up}/>
            </Switch>
        </main>
    }
}



const App = () => (
    <div>
        <Header />
        <Main />
    </div>
)
render(<App/>, document.getElementById('app'));