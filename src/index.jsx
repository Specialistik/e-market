import React from 'react';
import {render} from 'react-dom';
import userStore from './store'

import {
    BrowserRouter as Router,
    Route,
    Switch
  } from 'react-router-dom';

import { SignIn, SignUp, PickRole } from './auth/views.jsx';
import { Categories } from './core/views.jsx';

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
        this.state = userStore.getState();
    }
    componentDidMount() {
        /*
        this.subscribe = userStore.subscribe(() =>
            this.setState(userStore.getState())
        );
        */
        this.state = userStore.getState();
        console.log(this.state, 'look here');
    }
    render () {
        return <main>
            <Router>
                <Switch>
                    <Route exact path='/react_index' component={SignIn} />
                    <Route path='/pick_role' component={PickRole}/>
                    <Route path='/sign_up' component={SignUp}/>
                    <Route path='/categories/' component={Categories}/>
                </Switch>
            </Router>
        </main>
    }
}

const App = () => (
    <div>
        <Header />
        <Main />
    </div>
);
render(<App/>, document.getElementById('app'));