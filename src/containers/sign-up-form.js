import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { WebView } from "react-native";

import * as AuthActionCreators from "../actions/auth";

class SignUpFormContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            company_name: "",
            inn: "",
            phone: "",
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
            this.setState({inn: parseInt(event.target.value) || ""});
        }
    }

    handlePhoneChange(event) {
        if (event.target.value.length <= 10) {
            this.setState({phone: parseInt(event.target.value || "")});
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
        fetch("/api/sign_up/", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
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
                this.props.actions.createAccount(data.token, data.role);
            })
            .catch((e) => this.setState({ error: e }))
            .catch((e) => this.setState({ error: e }))
            .catch((e) => this.setState({ error: e }));
    }

    handleSubmit(event) {
        event.preventDefault();
        this.signupUser(this.state.company_name, this.state.inn, this.state.password, this.state.email, this.state.phone);
    }

    componentDidMount() {
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return <WebView> {this.props.children} </WebView>;
    }
}

const mapStateToProps = (state) => {
    return {
        role: state.userReducer["role"],
        token: state.userReducer["token"],
    };
};

const mapDispatchToProps = (dispatch) => {
    return { actions: bindActionCreators(AuthActionCreators, dispatch) };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpFormContainer);

SignUpFormContainer.propTypes = {
    company_name: PropTypes.string,
    inn: PropTypes.number,
    email: PropTypes.string,
    phone: PropTypes.string,
    password: PropTypes.string,
    privacy_check: PropTypes.bool,
    children: PropTypes.array,
    actions: PropTypes.arrayOf(string)
};