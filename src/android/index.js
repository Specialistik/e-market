import React from 'react';
import { connect } from 'react-redux';

import { View } from 'react-native';

import SignIn from './sign-in';
import Categories from './categories'

class IndexContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: props.hasOwnProperty('token') ? props.token : null
        }
    }

    render() {
        if (this.state.token)
            return <View><Categories/></View>
        return <View><SignIn/></View>
    }
}

const mapStateToProps = (state) => {
    return {
        role: state.userReducer['role'],
        token: state.userReducer['token']
    }
};

export default connect(mapStateToProps)(IndexContainer);

