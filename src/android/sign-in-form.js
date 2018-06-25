import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SignInFormContainer from '../containers/sign-in-form';
import * as AuthActionCreators from "../actions/auth";

class SignInForm extends React.Component {
    constructor(props) {
        super(props);
        this.error = null;
        this.state = {email: '', password: ''};
    }

    render() {
        return <SignInFormContainer>
            <View>
                <View>
                    <View>
                        <View>
                            <TextInput value={this.props.email} onChangeText={this.props.handleEmailChange}/>
                        </View>
                    </View>

                    <View>
                        <View>
                            <TextInput value={this.props.password} onChangeText={this.props.handlePasswordChange}/>
                        </View>
                    </View>
                </View>
                <Button
                    onPress={() => this.props.signUser()}
                    title="Войти"
                />
            </View>
        </SignInFormContainer>
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