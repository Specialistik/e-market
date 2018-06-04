import React from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import SignUp from './sign-up.jsx';

const contentStyle = {
    backgroundImage: 'url(' + 'static/images/bg-image/bg-type1.png' + ')',
};

class CustomerCheckEntity extends React.Component {
    render() {
        return <i className={"fa " + (this.props.customer ? 'fa-check': "")} aria-hidden="true"/>
    }
}

class ProducerCheckEntity extends React.Component {
    render() {
        return <i className={"fa " + (this.props.producer ? 'fa-check': "")} aria-hidden="true"/>
    }
}

export default class PickRole extends React.Component {
    constructor(props) {
        super(props);
        this.state = { producer: true, customer: false };
        this.pickedUp = this.pickedUp.bind(this);
        this.goToSignUp = this.goToSignUp.bind(this);
        this.producerClicked = this.producerClicked.bind(this);
        this.customerClicked = this.customerClicked.bind(this);
    }

    pickedUp() {
        return this.state.producer || this.state.customer;
    }

    goToSignUp() {
        if (this.pickedUp()) {
            this.render(<SignUp/>)
        }
    }

    producerClicked() {
        this.setState({ customer: false });
        this.setState({ producer: !this.state.producer });
    }

    customerClicked() {
        this.setState({ producer: false });
        this.setState({ customer: !this.state.customer });
    }

    render () {
        return <div id="content" className="content_bg" style={contentStyle}>
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
                                <a className="btn big light_orange icon_right" onClick={this.producerClicked}>
                                    Я - ПОСТАВЩИК
                                    <ProducerCheckEntity producer={this.state.producer} customer={this.state.customer}/>
                                </a>
                            </div>

                            <div className="entered_bottom_box">
                                <h3>Для тех, кто закупает продукты питания</h3>
                                <a className="btn big light_orange icon_right" onClick={this.customerClicked}>
                                    Я - ТОРГОВАЯ ТОЧКА
                                    <CustomerCheckEntity producer={this.state.producer} customer={this.state.customer} onClick={this.customerClicked}/>
                                </a>
                            </div>
                        </div>
                            <Link to={`/sign_up`} className="btn hight_orange">Далее</Link>
                    </div>
                </div>
            </div>
        </div>
    }
}

PickRole.propTypes = {
    customer: PropTypes.bool,
    producer: PropTypes.bool
};