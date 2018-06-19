import React from 'react';
import { connect } from 'react-redux';

import SignIn from './sign-in';
import Categories from './categories'

class IndexContainer extends React.Component {
    render() {
        if (this.props.token) {
            this.props.navigation.push('Categories')
        } else {
            this.props.navigation.push('SignIn')
        }
    }
}

const mapStateToProps = (state) => {
    return {
        role: state.userReducer['role'],
        token: state.userReducer['token']
    }
};

export default connect(mapStateToProps)(IndexContainer);

