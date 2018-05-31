import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as AuthActionCreators from './actions'

export class SignInForm extends React.Component {
    constructor(props) {
        super(props);
        this.error = null;
        this.state = {email: '', password: ''};
    
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.signUser = this.signUser.bind(this);
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }
  
    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    componentDidMount() {
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    signUser(username, password) {
        fetch('/api/sign_in/', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                username: this.state.email,
                password: this.state.password,
            }),
            method: 'POST'
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
            }).then((response) => response.json())
                .then((data) => {
                    this.props.dispatch(this.props.actions.setToken(data.token, data.role));
                })
                .catch((e) => console.log(e))
            .catch((e) => console.log(e))
        .catch((e) => console.log(e))
    }

    handleSubmit(event) {
        event.preventDefault();
        this.signUser(this.state.username, this.state.password);
    }

    render() {
        return <form action="/api/sign_in/" method="POST" className="wrapp_form_signin validate" noValidate onSubmit={this.handleSubmit}>
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
    }
}


export class SignUpForm extends React.Component {
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

    handleInnChange(event) {
        if (event.target.value.length <= 12) {
            this.setState({inn: parseInt(event.target.value) || ''});
        }
    }

    handlePhoneChange(event) {
        if (event.target.value.length <= 10) {
            this.setState({phone: parseInt(event.target.value || '')});
        }
    }

    handleCompanyNameChange(event) {
        this.setState({company_name: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }
  
    handleEmailChange(event) {
        this.setState({email: event.target.value});
    } 

    handlePrivacyChange(event) {
        this.setState({privacy_check: event.target.value});
    }

    signupUser(company_name, inn, password, email, phone) {
        fetch('/api/sign_up/', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                email: email,
                password: password,
                company_name: company_name,
                inn: inn,
                phone: phone
            }),
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
            }).then((response) => response.json())
                .then((data) => {
                    this.props.dispatch(this.props.actions.createAccount(data.token, data.role));
                })
                .catch((e) => this.setState({ error: e }))
            .catch((e) => this.setState({ error: e }))
        .catch((e) => this.setState({ error: e }))
    }

    handleSubmit(event) {
        event.preventDefault();
        this.signupUser(this.state.company_name, this.state.inn, this.state.password, this.state.email, this.state.phone);
    }

    componentDidMount() {
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return <form action="/api/sign_up/" method="POST" className="wrapp_form_signup validate" noValidate onSubmit={this.handleSubmit}>
            <div className="wrapp_verification_col">
                <div className="verification_box_col">
                    <label htmlFor="" className="label1">Наименование компании</label>
                    <div className="error_form_container">
                        <input name="company_name" type="text" required value={this.state.company_name} onChange={this.handleCompanyNameChange} />
                    </div>
                </div>

                <div className="verification_box_col">
                    <label htmlFor="" className="label1">ИНН</label>
                    <div className="error_form_container">
                        <input name="inn" type="text" required placeholder="------------"
                                data-mask="999999999999" minLength="10" className="number_type_clear" value={this.state.inn} onChange={this.handleInnChange} />
                    </div>
                </div>

                <div className="verification_box_col">
                    <label htmlFor="" className="label1">Пароль</label>
                    <div className="error_form_container">
                        <input name="password" type="password" value={this.state.password} required onChange={this.handlePasswordChange} />
                    </div>
                </div>

                <div className="verification_box_col">
                    <label htmlFor="" className="label1">E-mail</label>
                    <div className="error_form_container">
                        <input name="email" type="email" value={this.state.email} required onChange={this.handleEmailChange} />
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
                                <input name="phone" type="tel" placeholder="( - - - )  - - -  - -  - -" required value={this.state.phone} onChange={this.handlePhoneChange}
                                        data-mask="(999) 999 99 99" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="verification_box_col">
                    <div className="wrapp_privacy_policy">
                        <input type="checkbox" id="privacy_policy" value={this.state.privacy_check} onChange={this.handlePrivacyChange} required/>
                            <label htmlFor="privacy_policy"></label>

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
    }
}

const mapStateToProps = (state) => {
    return {
        role: state.userReducer['role'],
        token: state.userReducer['token'],
    }
}

const mapDispatchToProps = (dispatch) => {
    return { actions: bindActionCreators(AuthActionCreators, dispatch) }
}

export const SignInFormContainer = connect(
    mapStateToProps, 
    mapDispatchToProps
)(SignInForm);


export const SignUpFormContainer = connect(
    mapStateToProps, 
    mapDispatchToProps
)(SignUpForm);
