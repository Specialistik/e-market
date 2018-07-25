import React from "react";
import PropTypes from "prop-types";
import { View, Text, Button } from "react-native";

import SignInForm from "./sign-in-form";

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render () {
        return <View>
            <Text>Вход в систему</Text>
            <SignInForm/>
            <View>
                <Button
                    title="Зарегистрироваться"
                    onPress={this.props.navigation.navigate("PickRole")}
                />
            </View>
        </View>;
    }
}

SignIn.propTypes = {
    navigation: PropTypes.object
};