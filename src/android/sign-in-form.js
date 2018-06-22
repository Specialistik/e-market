import React from 'react';
import { View, TextInput, Text, Button } from 'react-native';

import SignInFormContainer from '../containers/sign-in-form';

export default class SignInForm extends React.Component {
    constructor(props) {
        super(props);
        this.error = null;
        this.state = {email: '', password: ''};
    }

    render() {
        return <SignInFormContainer >
            <View>
                <View>
                    <View>
                        <View>
                            <TextInput value={this.props.email} onChange={this.handleEmailChange}/>
                        </View>
                    </View>

                    <View>
                        <View>
                            <TextInput value={this.props.password} onChange={this.handlePasswordChange}/>
                        </View>
                    </View>
                </View>
                <Button
                    onPress={() => this.signUser()}
                    title="Войти"
                />
            </View>
        </SignInFormContainer>
    }
}