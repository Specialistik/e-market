import React from "react";
import { View, Text, Button } from 'react-native';

import SignInForm from './sign-in-form';

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render () {
        return <View>
            <View>
                <View>
                    <Text>Вход в систему</Text>
                </View>

                <View>
                    <SignInForm />

                    <View>
                        <Button
                            title="Зарегистрироваться"
                            onPress={() => this.props.navigation.navigate('PickRole')}
                        />
                    </View>
                </View>
            </View>
        </View>
    }
}