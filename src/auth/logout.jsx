import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as authActionCreators from "./actions";

class Logout extends React.Component {
    componentWillMount() {
        this.props.dispatch(authActionCreators.logOut());
    }

    render() {
        return (
            <Redirect to="/" />
        );
    }
}

Logout.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect()(Logout);