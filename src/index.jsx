import React from 'react';
import {render} from 'react-dom';
import userStore from './store'

import {
    BrowserRouter as Router,
    Route,
    Switch
  } from 'react-router-dom';

import { SignIn, SignUp, PickRole } from './auth/views.jsx';
import { Categories, Subcategories, Products } from './core/views.jsx';

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
        this.state = userStore.getState();
    }

    componentDidMount() {
        this.unsubscribe = userStore.subscribe(() =>
        this.setState({token: userStore.getState().token, role : userStore.getState().role})
    )}

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        console.log(this.state);
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
        this.state = userStore.getState();
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

const App = () => (
    <div>
        <Header />
        <Main />
    </div>
);
render(<App/>, document.getElementById('app'));