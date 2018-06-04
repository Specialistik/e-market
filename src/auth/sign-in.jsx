import React from "react";
import { Link } from 'react-router-dom';
import { SignInFormContainer } from './forms.jsx';

const contentStyle = {
    backgroundImage: 'url(' + 'static/images/bg-image/bg-type1.png' + ')',
};

export default class SignIn extends React.Component {
    render () {
        return <div id="content" className="content_bg verification_content" style={contentStyle}>
            <div className="wrapp_verification">
                <div className="top_verification">
                    <h3 className="title_verification">Вход в систему</h3>
                </div>

                <div className="content_verification">
                    <SignInFormContainer />

                    <div className="box_btn clearfix">
                        <Link to={`/pick_role`} className="hight_orange">Зарегистрироваться</Link>
                    </div>
                </div>
            </div>
        </div>
    }
}