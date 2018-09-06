import React from "react";
import { render } from "react-dom";
import { Provider, connect } from "react-redux";
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";

import PickRole from "./auth/pick-role.jsx";
import SignIn from "./auth/sign-in.jsx";
import SignUp from "./auth/sign-up.jsx";
import Logout from "./auth/logout.jsx";

import Categories from "./core/categories.jsx";
import Products from "./core/products.jsx";
import Header from "./core/header.jsx";


import configureStore from "./store";
export const store = configureStore();


class IndexContainer extends React.Component {
    render() {
        if (this.props.token) {
            return <Categories />;
        } else {
            return <SignIn />;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        role: state.userReducer["role"],
        token: state.userReducer["token"]
    };
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
                    <Route path='/log_out' component={Logout}/>

                    <Route exact path='/categories/' component={Categories}/>
                    <Route exact path='/categories/:pid/' component={Categories}/>
                    <Route path='/products/:cat_id/' component={Products}/>
                </Switch>
            </div>
        </Router>
    </Provider>,
    document.getElementById("app")
);

IndexContainer.propTypes = {
    token: PropTypes.string
};