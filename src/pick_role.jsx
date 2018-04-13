import React from 'react';
import {render} from 'react-dom';
/*
const API = () => (
    let pick_role => (

    )
);
*/

const SignIn = () => (
    <header id="header" className="header_wrapp claerfix">
        <hr className="deviders1"/>
        <div id="content" className="content_bg verification_content"
             style="background-image: url('static/images/bg-image/bg-type1.png');">
            <div className="wrapp_verification">
                <div className="top_verification">
                    <h3 className="title_verification">Вход в систему</h3>
                </div>

                <div className="content_verification">
                    <form action="/sign_in" method="POST" className="wrapp_form_signin validate" noValidate>
                        {% csrf_token %}
                        <div className="wrapp_verification_col">
                            <div className="verification_box_col">
                                <label htmlFor="" className="label1">E-mail</label>
                                <div className="error_form_container">
                                    <input name="email" type="email" required>
                                </div>
                            </div>

                            <div className="verification_box_col">
                                <label htmlFor="" className="label1">Пароль</label>
                                <div className="error_form_container">
                                    <input name="password" type="password" required>
                                </div>
                                {% if error %}
                                <p className="tooltip_txt1">
                                    {{error}}
                                </p>
                                {% endif %}
                            </div>
                        </div>
                        <button className="btn hight_orange full_width">Войти</button>
                    </form>

                    <div className="box_btn clearfix">
                        <a href="/register" className="light_orange">Зарегистрироваться</a>
                    </div>
                </div>
            </div>
        </div>
    </header>
);

const SignUp = () => {

};

class PickRole extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
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

                                <a  className="btn big light_orange icon_right" id="producer">
                                    Я - ПОСТАВЩИК
                                    <i className="fa fa-check" aria-hidden="true"/>
                                </a>

                            </div>

                            <div className="entered_bottom_box">

                                <h3>Для тех, кто закупает продукты питания</h3>

                                <a className="btn big light_orange icon_right" id="customer">
                                    Я - ТОРГОВАЯ ТОЧКА
                                    <i className="fa" aria-hidden="true"/>
                                </a>
                            </div>
                        </div>

                        <a className="btn hight_orange" id="pick_role">Далее</a>
                        <form action="" method="POST" id="pick_role_form">
                            <input type="hidden" name="role" id="role"/>
                        </form>

                    </div>
                    <!-- entered_bottom_inner -->

                </div>

            </div>
        </div>
    }
}