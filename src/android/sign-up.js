import React from "react";
import { View, Text } from 'react-native';

import SignUpForm from './sign-up-form';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return <View>
            <View>
                <View>
                    <Text>Регистрация</Text>
                </View>

                <View>
                    <SignUpForm />
                </View>
            </View>
        </View>
    }
}