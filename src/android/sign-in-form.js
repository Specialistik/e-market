import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { StyleSheet, View, TextInput, Text } from 'react-native';

import * as AuthActionCreators from '../actions/auth'

class SignInForm extends React.Component {
    constructor(props) {
        super(props);
        this.error = null;
        this.state = {email: '', password: ''};

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.signUser = this.signUser.bind(this);
    }

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
        fetch('/api/sign_in/', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                username: this.state.email,
                password: this.state.password,
            }),
            method: 'POST'
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
                .catch((e) => console.log(e))
            .catch((e) => console.log(e))
        .catch((e) => console.log(e))
    }

    handleSubmit(event) {
        event.preventDefault();
        this.signUser(this.state.username, this.state.password);
    }

    render() {
        return <form action="/api/sign_in/" method="POST" className="wrapp_form_signin validate" noValidate onSubmit={this.handleSubmit}>
            <View className="wrapp_verification_col">
                <View className="verification_box_col">
                    <label htmlFor="" className="label1">E-mail</label>
                    <View className="error_form_container">
                        <TextInput name="email" type="email" required value={this.props.email} onChange={this.handleEmailChange}/>
                    </View>
                </View>

                <View className="verification_box_col">
                    <label htmlFor="" className="label1">Пароль</label>
                    <View className="error_form_container">
                        <TextInput name="password" type="password" required value={this.props.password} onChange={this.handlePasswordChange}/>
                    </View>
                    <Text className="tooltip_txt1">
                    </Text>
                </View>
            </View>
            <button className="btn hight_orange full_width">Войти</button>
        </form>
    }
}

const mapStateToProps = (state) => {
    return {
        role: state.userReducer['role'],
        token: state.userReducer['token'],
    }
};

const mapDispatchToProps = (dispatch) => {
    return { actions: bindActionCreators(AuthActionCreators, dispatch) }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInForm);

SignInForm.propTypes = {
    email: PropTypes.string,
    password: PropTypes.string
};