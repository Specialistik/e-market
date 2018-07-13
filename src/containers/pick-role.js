import React from "react";
import PropTypes from 'prop-types';
import { View } from 'react-native';

//import SignUp from './sign-up.jsx';

export default class PickRoleContainer extends React.Component {
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
            //this.props.navigate
            //this.render(<SignUp/>)

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
        return <View> { this.props.children } </View>
    }
}

PickRoleContainer.propTypes = {
    customer: PropTypes.bool,
    producer: PropTypes.bool
};