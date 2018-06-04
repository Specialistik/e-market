import React from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends React.Component {
    render() {
        return <header id="header" className="header_wrapp clearfix">
            <div className="header_inner claerfix">
                <div className="logo">
                    <Link to="/">
                        <img src="/static/images/small-logo.png" alt=""/>
                    </Link>
                </div>

                { this.props.token ?
                    <div className="header_right_box">
                        { this.props.role !== null && this.props.role in ['customer', 'manager'] ?
                            <div className="basket_wrapp">
                                <a href="/basket" className="basket_box">
                                    <i className="fa fa-shopping-basket" aria-hidden="true" />
                                    <span className="basket_item">14</span>
                                </a>

                                <div className="basket_box_count">
                                    <span className="basket_count" id="basket">88</span> руб
                                </div>
                            </div> :''
                        }

                        { this.props.role !== null && this.props.role === 'manager' ?
                            <div className="basket_wrapp">
                                <a href="/basket" className="basket_box">
                                    <i className="fa fa-shopping-basket" aria-hidden="true" />
                                    <span className="basket_item">14</span>
                                </a>

                                <div className="basket_box_count">
                                    <span className="basket_count">88</span> руб
                                </div>
                            </div> :''
                        }

                        
                        <Link to='/profile/' href="/profile/" className="wrapp_company_logo clearfix">
                            <span className="company_logo">
                                <img src="/static/images/icons/user-icon.png" alt=""/>
                            </span>

                            <span className="company_name">
                                Моя компания
                            </span>
                        </Link>

                        <Link to='/logout' className="out_btn">
                            Выйти
                            <i className="fa fa-angle-down" aria-hidden="true" />
                        </Link>
                    </div>:''
                }
            </div>
        </header>
    }
};

const mapStateToProps = state => {
    return {
        role: state.userReducer['role'],
        token: state.userReducer['token'],
    }
};

export default connect(
    mapStateToProps,
    null
)(Header);