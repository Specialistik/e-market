import React from 'react';
import { render } from 'react-dom';
import { Route, Redirect } from 'react-router';

import { Categories } from './views.jsx';
import { createAccount, setToken, logOut } from './actions'
import { store } from '../index.jsx'

export class SignInForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: ''};
    
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.signUser = this.signUser.bind(this);
    }
  
    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }
  
    handlePasswordChange(event) {
        this.setState({password: event.target.value});
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
                    console.log('returned data', data);
                    // this is where magic should happen
                    store.dispatch(setToken({ token: data.token, role: data.role }));
                    //this.setState({ token: signed_user.token, role: signed_user.role })
                })
                .catch((e) => this.setState({ error: e }))
            .catch((e) => this.setState({ error: e }))
        .catch((e) => this.setState({ hasErrored: true }))
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
        this.state = { email: '', password: '', privacy_check: false};
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePrivacyChange = this.handlePrivacyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleEmailChange(event) {
        event.preventDefault();
    }

    handlePrivacyChange(event) {
        event.preventDefault();
    }
  
    handleSubmit(event) {
        event.preventDefault();

        fetch('/api/sign_up/', {
            email: this.state.email,
            password: this.state.password,
            company_name: this.state.company_name,
            inn: this.state.inn,
            phone: this.state.phone
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
            }).then((response) => response.json())
                .then((data) => {
                    //console.log('props on sign in, ', this.props);
                    store.dispatch(setToken({token: data.token, role: data.role}));
                    //store
                    //.dispatch(fetchPosts('reactjs'))
                    //.then(() => console.log(store.getState()))
                    //store.dispatch(
                    //this.setState({ token: data.token, role: data.role })
                })
                .catch((e) => this.setState({ error: e }))
            .catch((e) => this.setState({ error: e }))
        .catch((e) => this.setState({ error: e }))
    }

    render() {
        return <form action="/api/sign_up/" method="POST" className="wrapp_form_signup validate" id="signup_form" noValidate onSubmit={this.handleSubmit}>
            <div className="wrapp_verification_col">
                <div className="verification_box_col">
                    <label htmlFor="" className="label1">Наименование компании</label>
                    <div className="error_form_container">
                        <input name="company_name" type="text" required value={this.state.company_name}/>
                    </div>
                </div>

                <div className="verification_box_col">
                    <label htmlFor="" className="label1">ИНН</label>
                    <div className="error_form_container">
                        <input name="inn" type="text" required placeholder="------------"
                                data-mask="999999999999" minLength="10" className="number_type_clear" value={this.props.inn}/>
                    </div>
                </div>

                <div className="verification_box_col">
                    <label htmlFor="" className="label1">Пароль</label>
                    <div className="error_form_container">
                        <input name="password" type="password" value={this.props.password}/>
                    </div>
                </div>

                <div className="verification_box_col">
                    <label htmlFor="" className="label1">E-mail</label>
                    <div className="error_form_container">
                        <input name="email" type="email" value={this.props.email}/>
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
                                <input name="phone" type="tel" placeholder="( - - - )  - - -  - -  - -"
                                        data-mask="(999) 999 99 99" value={this.props.tel}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="verification_box_col">
                    <div className="wrapp_privacy_policy">
                        <input type="checkbox" id="privacy_policy" value={this.state.privacy_check} onChange={this.handlePrivacyChange} />
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

