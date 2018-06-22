import React from "react";
import { View, Text, TextInput, Button } from 'react-native';

import SignUpFormContainer from '../containers/sign-up-form';

export default class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <SignUpFormContainer>
            <View>
                <View>
                    <View >
                        <TextInput value={this.props.company_name} onChange={this.handleCompanyNameChange} />
                    </View>
                </View>

                <View>
                    <View >
                        <TextInput value={this.props.inn} onChange={this.handleInnChange} />
                    </View>
                </View>

                <View>
                    <View >
                        <TextInput value={this.props.password} required onChange={this.handlePasswordChange} />
                    </View>
                </View>

                <View>
                    <View >
                        <TextInput value={this.props.email}  onChange={this.handleEmailChange} />
                    </View>
                </View>

                <View>
                    <View>
                        <View>
                            <View >
                                <TextInput value="+7" />
                            </View>
                        </View>

                        <View>
                            <View >
                                <TextInput value={this.props.phone} onChange={this.handlePhoneChange}/>
                            </View>
                        </View>
                    </View>
                </View>

                <View>
                    <View>
                        <TextInput value={this.props.privacy_check} onChange={this.handlePrivacyChange} />
                    </View>
                </View>
            </View>
            <Button >Зарегистрироваться</Button>
        </SignUpFormContainer>
    }
}
