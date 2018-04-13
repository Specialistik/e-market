import React from 'react';
import {render} from 'react-dom';
import { Router, browserHistory } from 'react-router';

const {
    Switch,
    Route,
} = ReactRouterDOM;

/*
let pick_role = () => (
    pass
);
*/
const Header = () => (
    <header id="header" className="header_wrapp clearfix">
        <div className="header_inner claerfix">
            <div className="logo">
                <a href="/">
                    <img src="/static/images/small-logo.png" alt=""/>
                </a>
            </div>
        </div>
    </header>
);

const SignIn = () => (
    <div id="content" className="content_bg verification_content"
         style="background-image: url('static/images/bg-image/bg-type1.png');">
        <div className="wrapp_verification">
            <div className="top_verification">
                <h3 className="title_verification">Вход в систему</h3>
            </div>

            <div className="content_verification">
                <form action="/sign_in" method="POST" className="wrapp_form_signin validate" noValidate>
                    <div className="wrapp_verification_col">
                        <div className="verification_box_col">
                            <label htmlFor="" className="label1">E-mail</label>
                            <div className="error_form_container">
                                <input name="email" type="email" required/>
                            </div>
                        </div>

                        <div className="verification_box_col">
                            <label htmlFor="" className="label1">Пароль</label>
                            <div className="error_form_container">
                                <input name="password" type="password" required/>
                            </div>
                            /*
                            <p className="tooltip_txt1">
                                {{error}}
                            </p>
                            */
                        </div>
                    </div>
                    <button className="btn hight_orange full_width">Войти</button>
                </form>

                <div className="box_btn clearfix">
                    /*{% comment %}<a href="/password_reset" className="light_orange">Забыли
                    пароль?</a>{% endcomment %}*/
                    <a href="/sign_up" className="light_orange">Зарегистрироваться</a>
                </div>
            </div>
        </div>
    </div>
);

const SignUp = () => (
    <div id="content" className="content_bg verification_content" style="background-image: url('static/images/bg-image/bg-type1.png');">

        <div className="wrapp_verification">
            <div className="top_verification">
                <h3 className="title_verification">Регистрация</h3>
            </div>

            <div className="content_verification">
                <form action="/api/sign_up/" method="POST" className="wrapp_form_signup validate" id="signup_form" noValidate>
                    <div className="wrapp_verification_col">
                        <div className="verification_box_col">
                            <label htmlFor="" className="label1">Наименование компании</label>
                            <div className="error_form_container">
                                <input name="company_name" type="text" required />
                            </div>
                        </div>

                        <div className="verification_box_col">
                            <label htmlFor="" className="label1">ИНН</label>
                            <div className="error_form_container">
                                <input name="inn" type="text" required placeholder="------------"
                                       data-mask="999999999999" minLength="10" className="number_type_clear" />
                            </div>
                        </div>

                        <div className="verification_box_col">
                            <label htmlFor="" className="label1">Пароль</label>
                            <div className="error_form_container">
                                <input name="password" type="password" />
                            </div>
                        </div>

                        <div className="verification_box_col">
                            <label htmlFor="" className="label1">E-mail</label>
                            <div className="error_form_container">
                                <input name="email" type="email" />
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
                                               data-mask="(999) 999 99 99" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="verification_box_col">
                            <div className="wrapp_privacy_policy">
                                <input type="checkbox" id="privacy_policy" />
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
            </div>
        </div>
    </div>
);

class PickRole extends React.Component {
    constructor(props) {
        super(props);
        this.pickRole = this.handleClick.bind(this);
    }

    pickRole()  {

    }

    iProducer() {

    }

    iCustomer() {

    }

    render () {
        return <div id="content" className="content_bg" style="background-image: url('static/images/bg-image/bg-type1.png');">
        <div className="entered_wrapp">
            <div className="entered_top">
                <div className="big_logo">
                    <img src="/static/images/big-logo.png" alt=""/>
                </div>

                <h1 className="subtitle_entered">
                    Укажите чем занимается Ваша компания:
                    продажей или покупкой продуктов питания
                </h1>

            </div>

            <div className="entered_bottom_wrapp">

                <div className="entered_bottom_inner">

                    <div className="entered_bottom_box_parrent clearfix">
                        <div className="entered_bottom_box">

                            <h3>Для тех, кто торгует продуктами питания</h3>

                            <a  className="btn big light_orange icon_right" onClick={this.iProducer} id="producer">
                                Я - ПОСТАВЩИК
                                <i className="fa fa-check" aria-hidden="true"/>
                            </a>

                        </div>

                        <div className="entered_bottom_box">

                            <h3>Для тех, кто закупает продукты питания</h3>

                            <a className="btn big light_orange icon_right" id="customer" onClick={this.iCustomer}>
                                Я - ТОРГОВАЯ ТОЧКА
                                <i className="fa" aria-hidden="true"/>
                            </a>
                        </div>
                    </div>

                    <a className="btn hight_orange" onClick={this.pickRole}>Далее</a>
                    /*
                    <form action="" method="POST" id="pick_role_form">
                        <input type="hidden" name="role" id="role"/>
                    </form>
                    */
                </div>
            </div>
        </div>
    </div>
);

class Main extends React.Component {
    constructor(props) {
        super(props);
        /*
        this.state = {
            user: {
                token: login(),
                role: 'consume the role',
            }
        };
        */
    }
    render () {
        return <main>
            <Switch>
                <Route exact path='/' component={PickRole}/>
                <Route path='/sign_in' component={Sign_in}/>
                <Route path='/sign_up' component={Sign_up}/>
            </Switch>
        </main>


    }
    /*
    render() {
        return <main>
            <Switch>
                <Route exact path='/' component={PickRole}/>
                <Route path='/sign_in' component={Sign_in}/>
                <Route path='/sign_up' component={Sign_up}/>
            </Switch>
        </main>
    }
    */
}



const App = () => (
    <div>
        <Header />
        <Main />
    </div>
);
render(<App/>, document.getElementById('app'));