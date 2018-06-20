import React from "react";
import { View, Text } from 'react-native';
import SignUpForm from './sign-up-form';
import { styles } from './styles';
/*
const contentStyle = {
    backgroundImage: 'url(' + 'static/images/bg-image/bg-type1.png' + ')',
};
*/
export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return <View /*className="content_bg verification_content" style={contentStyle}*/ >
            <View /*className="wrapp_verification"*/ >
                <View /*className="top_verification"*/ >
                    <Text h3 /*className="title_verification"*/ >Регистрация</Text>
                </View>

                <View /*className="content_verification"*/ >
                    <SignUpForm />
                    /*<Link to={`/pick_role`} className="hight_orange">Зарегистрироваться</Link>*/

                </View>
            </View>
        </View>
    }
}