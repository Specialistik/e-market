import React from 'react';
import {render} from 'react-dom';

class HeaderRight extends React.Component {
    constructor(props) {
        super(props);
        //this.state = {user: {role}};
      }
    
    render() {
        //if this.state.user.is_a
        /*return*/

        /*
{% if user.is_authenticated %}
                <div className="header_right_box">
                    {% if user.profile %}
                    {% if user.profile.role == 'customer' or user.profile.role == 'manager' %}
                    <div className="basket_wrapp">
                        <a href="/basket" className="basket_box">
                            <i className="fa fa-shopping-basket" aria-hidden="true"></i>
                            <span className="basket_item">{{basket_items}}</span>
                        </a>

                        <div className="basket_box_count">
                            <span className="basket_count" id="basket">{{basket_price}}</span> руб
                        </div>

                    </div>
                    <!-- basket_wrapp -->
                    {% endif %}

                     {% if user.profile.role == 'manager' %}
                    <div className="basket_wrapp">

                        <a href="/my_clients" className="basket_box piggy_bank">

                            <img src="/static/images/icons/piggy-bank-and-coin.png" alt="">

                        </a>

                        <div className="basket_box_count">
                            <span className="basket_count" id="moneybox">{{moneybox_sum}} </span> руб
                        </div>

                    </div>
                    <!-- basket_wrapp -->
                    {% endif %}

                    <a href="/profile/" className="wrapp_company_logo clearfix">

                                <span className="company_logo">
                                    <img src="/static/images/icons/user-icon.png" alt="">
                                </span>

                        <span className="company_name">
                                    {{user.profile.company_name}}
                                </span>

                    </a>
                    {% endif %}

                    <a href="/logout" className="out_btn">
                        Выйти
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </a>
                </div>
                {% endif %}
                <!-- - - - - - - - - - - - - - End of ? - - - - - - - - - - - - - - - - -->
        */
    }
}

class Header extends React.Component {
    render() {
        return (
            <div className="logo">
                <a href="/">
                    <img src="/static/images/small-logo.png" alt=""/>
                </a>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                role: 'filthy, helpless slut',
                is_authenticated: false,
            }
        };
    }

    render() {
        return 
            <Header/>
            /*
            <header id="header" className="header_wrapp clearfix">
                <div className="header_inner claerfix">
                    <div className="logo">
                        <a href="/">
                            <img src="/static/images/small-logo.png" alt=""/>
                        </a>
                    </div>
                </div>
            </header>
            */
    }
}

React.render(App, document.getElementById('app'))