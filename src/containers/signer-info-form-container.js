import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View } from "react-native";

import * as AuthActionCreators from "../actions/auth";

class SignerInfoFormContainer extends React.Component {
    constructor(props) {
        super(props);
        this.error = null;
        this.state = {email: "", password: ""};

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.signUser = this.signUser.bind(this);
    }
/*
    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    componentDidMount() {
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    signUser(username, password) {
        fetch("/api/sign_in/", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: this.state.email,
                password: this.state.password,
            }),
            method: "POST"
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }).then((response) => response.json())
            .then((data) => {
                this.props.actions.setToken(data.token, data.role);
                //this.props.dispatch(this.props.actions.setToken(data.token, data.role));
            })
            .catch((e) => this.error(e));
    }
*/
    handleSubmit(event) {
        event.preventDefault();
        //this.signUser(this.state.username, this.state.password);
    }

    render() {
        return <View> {this.props.children} </View>;
    }
}

const mapStateToProps = (state) => {
    return {
        role: state.userReducer["role"],
        token: state.userReducer["token"],
    };
};

const mapDispatchToProps = (dispatch) => {
    return { actions: bindActionCreators(AuthActionCreators, dispatch) };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignerInfoFormContainer);

SignerInfoFormContainer.propTypes = {
    
}; 