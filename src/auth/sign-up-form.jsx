import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as AuthActionCreators from "./actions";
import SignUpFormContainer from '../containers/sign-up-form';

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            company_name: '',
            inn: '',
            phone: '',
            privacy_check: false
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePrivacyChange = this.handlePrivacyChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleInnChange = this.handleInnChange.bind(this);
        this.handleCompanyNameChange = this.handleCompanyNameChange.bind(this);
        this.signupUser = this.signupUser.bind(this);
    }


    render() {
        return <SignUpFormContainer>
            <form action="/api/sign_up/" method="POST" className="wrapp_form_signup validate" noValidate onSubmit={this.handleSubmit}>
                <div className="wrapp_verification_col">
                    <div className="verification_box_col">
                        <label htmlFor="" className="label1">Наименование компании</label>
                        <div className="error_form_container">
                            <input name="company_name" type="text" required value={this.props.company_name} onChange={this.handleCompanyNameChange} />
                        </div>
                    </div>

                    <div className="verification_box_col">
                        <label htmlFor="" className="label1">ИНН</label>
                        <div className="error_form_container">
                            <input name="inn" type="text" required placeholder="------------"
                                    data-mask="999999999999" minLength="10" className="number_type_clear" value={this.props.inn} onChange={this.handleInnChange} />
                        </div>
                    </div>

                    <div className="verification_box_col">
                        <label htmlFor="" className="label1">Пароль</label>
                        <div className="error_form_container">
                            <input name="password" type="password" value={this.props.password} required onChange={this.handlePasswordChange} />
                        </div>
                    </div>

                    <div className="verification_box_col">
                        <label htmlFor="" className="label1">E-mail</label>
                        <div className="error_form_container">
                            <input name="email" type="email" value={this.props.email} required onChange={this.handleEmailChange} />
                        </div>
                    </div>

                    <div className="verification_box_col">
                        <label htmlFor="" className="label1">Телефон</label>
                        <div className="verification_row clearfix">
                            <div className="verification_col code_country">
                                <div className="error_form_container">
                                    <input type="tel" required value="+7" disabled />
                                </div>
                            </div>

                            <div className="verification_col phone_box">
                                <div className="error_form_container">
                                    <input name="phone" type="tel" placeholder="( - - - )  - - -  - -  - -" required value={this.props.phone} onChange={this.handlePhoneChange}
                                            data-mask="(999) 999 99 99" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="verification_box_col">
                        <div className="wrapp_privacy_policy">
                            <input type="checkbox" id="privacy_policy" value={this.props.privacy_check} onChange={this.handlePrivacyChange} required/>
                                <label htmlFor="privacy_policy"/>

                                <label htmlFor="privacy_policy" className="privacy_policy_txt">
                                    Нажимая на кнопку «Отправить», я даю согласие на обработку персональных
                                    данных
                                    и соглашаюсь с <a href="/static/docs/confidential.pdf" target="_blank"
                                                        className="hight_orange">политикой
                                    конфиденциальности</a>
                                </label>
                        </div>
                    </div>
                </div>
                <button className="btn hight_orange full_width">Зарегистрироваться</button>
            </form>
        </SignUpFormContainer>
    }
}

const mapStateToProps = (state) => {
    return {
        role: state.userReducer['role'],
        token: state.userReducer['token'],
    }
};

const mapDispatchToProps = (dispatch) => {
    return { actions: bindActionCreators(AuthActionCreators, dispatch) }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpForm);

SignUpForm.propTypes = {
    company_name: PropTypes.string,
    inn: PropTypes.number,
    email: PropTypes.string,
    phone: PropTypes.string,
    password: PropTypes.string,
    privacy_check: PropTypes.bool
};