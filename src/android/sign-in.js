import React from "react";
import { View, Text, Button } from 'react-native';
import { styles } from './styles';
import SignInForm from './sign-in-form';

const contentStyle = {
    backgroundImage: 'url(' + 'static/images/bg-image/bg-type1.png' + ')',
};

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render () {
        return <View /*style={styles.content}*/ >
            <View /* style={styles.wrapp_verification}*/ >
                <View /* style={styles.top_verification} */>
                    <Text h3 /*className="title_verification" */>Вход в систему</Text>
                </View>

                <View /* className="content_verification" */ >
                    <SignInForm />

                    <View /* className="box_btn clearfix" */>
                        <Button
                            title="Зарегистрироваться"
                            onPress={() => this.props.nav.navigate('PickRole')}
                        />
                        {/*<Link to={`/pick_role`} className="hight_orange">Зарегистрироваться</Link>*/}
                    </View>
                </View>
            </View>
        </View>
    }
}