import React from "react";
import { Image, View, Header } from 'react-native';
import { Link } from 'react-router-native';
import { connect } from 'react-redux';

class NativeHeader extends React.Component {
    render() {
        return <View  id="header" className="header_wrapp clearfix">
        <Header leftComponent={{ icon: 'menu', color: '#fff' }} />
            <View className="header_inner claerfix">
                <View className="logo">
                    <Link to="/">
                        <Image
                            source="/static/images/small-logo.png"
                            style={{width: 70, height: 35}}
                        />
                    </Link>
                </View>

                { this.props.token ?
                    <View className="header_right_box">
                        { this.props.role !== null && this.props.role in ['customer', 'manager'] ?
                            <View className="basket_wrapp">
                                <a href="/basket" className="basket_box">
                                    <i className="fa fa-shopping-basket" aria-hidden="true" />
                                    <span className="basket_item">14</span>
                                </a>

                                <View className="basket_box_count">
                                    <span className="basket_count" id="basket">88</span> руб
                                </View>
                            </View> :''
                        }

                        { this.props.role !== null && this.props.role === 'manager' ?
                            <View className="basket_wrapp">
                                <a href="/basket" className="basket_box">
                                    <i className="fa fa-shopping-basket" aria-hidden="true" />
                                    <span className="basket_item">14</span>
                                </a>

                                <View className="basket_box_count">
                                    <span className="basket_count">88</span> руб
                                </View>
                            </View> :''
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
                    </View>:''
                }
            </View>
        </View>
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
)(NativeHeader);