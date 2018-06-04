import React from "react";
import SignUpForm from './sign-up-form.jsx';

const contentStyle = {
    backgroundImage: 'url(' + 'static/images/bg-image/bg-type1.png' + ')',
};

export default class SignUp extends React.Component {
    render() {
        return <div id="content" className="content_bg verification_content" style={contentStyle}>
            <div className="wrapp_verification">
                <div className="top_verification">
                    <h3 className="title_verification">Регистрация</h3>
                </div>

                <div className="content_verification">
                    <SignUpForm />
                </div>
            </div>
        </div>
    }
}