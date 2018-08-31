import React from "react";
import SignInFormContainer from "../containers/sign-in-form";

export default class SignInForm extends React.Component {
    constructor(props) {
        super(props);
        this.error = null;
        this.state = {email: "", password: ""};

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.signUser = this.signUser.bind(this);
    }

    render() {
        return <SignInFormContainer>
            <form action="/api/sign_in/" method="POST" className="wrapp_form_signin validate" noValidate onSubmit={this.handleSubmit}>
                <div className="wrapp_verification_col">
                    <div className="verification_box_col">
                        <label htmlFor="" className="label1">E-mail</label>
                        <div className="error_form_container">
                            <input name="email" type="email" required value={this.props.email} onChange={this.handleEmailChange}/>
                        </div>
                    </div>

                    <div className="verification_box_col">
                        <label htmlFor="" className="label1">Пароль</label>
                        <div className="error_form_container">
                            <input name="password" type="password" required value={this.props.password} onChange={this.handlePasswordChange}/>
                        </div>
                        <p className="tooltip_txt1">
                        </p>
                    </div>
                </div>
                <button className="btn hight_orange full_width">Войти</button>
            </form>
        </SignInFormContainer>
    }
}