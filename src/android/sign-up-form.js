import React from "react";
import PropTypes from 'prop-types';
import { View, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SignUpFormContainer from '../containers/sign-up-form';
import * as AuthActionCreators from "../actions/auth";

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <SignUpFormContainer>
            <View>
                <View>
                    <View>
                        <TextInput value={this.props.company_name} OnChangeText={this.props.handleCompanyNameChange}/>
                    </View>
                </View>

                <View>
                    <View>
                        <TextInput value={this.props.inn} OnChangeText={this.props.handleInnChange}/>
                    </View>
                </View>

                <View>
                    <View>
                        <TextInput value={this.props.password} OnChangeText={this.props.handlePasswordChange}/>
                    </View>
                </View>

                <View>
                    <View>
                        <TextInput value={this.props.email} OnChangeText={this.props.handleEmailChange}/>
                    </View>
                </View>

                <View>
                    <View>
                        <View>
                            <View>
                                <TextInput value="+7"/>
                            </View>
                        </View>

                        <View>
                            <View>
                                <TextInput value={this.props.phone} OnChangeText={this.props.handlePhoneChange}/>
                            </View>
                        </View>
                    </View>
                </View>

                <View>
                    <View>
                        <TextInput value={this.props.privacy_check} OnChangeText={this.props.handlePrivacyChange}/>
                    </View>
                </View>
            </View>
            <Button 
                onPress={() => this.props.signupUser()}
                title="Зарегистрироваться">
            </Button>
        </SignUpFormContainer>
    }
}


const mapStateToProps = (state) => {
    return {
        role: state.userReducer['role'],
        token: state.userReducer['token'],
    }
};

const mapDispatchToProps = (dispatch) => {
    return { actions: bindActionCreators(AuthActionCreators, dispatch)}
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpForm);

SignUpForm.propTypes = {
    email: PropTypes.string,
    password: PropTypes.string
};