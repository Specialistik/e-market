import React from "react";
import { connect } from 'react-redux';
import { View } from 'react-native';

class CategoryContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pid: (this.props.hasOwnProperty('match') && this.props.match.params.hasOwnProperty('pid') ? this.props.match.params.pid : null),
            categories: [],
            cat_name: ''
        };
        this.fetchCats = this.fetchCats.bind(this);
    }

    fetchCats(url) {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                this.setState({ isLoading: false });
                return response;
            })
                .then((response) => response.json())
                    .then((cat_entity) => this.setState({
                            categories: cat_entity.categories,
                            cat_name: cat_entity.hasOwnProperty('current_cat') ? (cat_entity.current_cat) : '',
                        })
                    ).catch((e) => this.setState({ hasErrored: true, error: e }))
                .catch((e) => this.setState({ hasErrored: true, error: e }))
        .catch((e) => this.setState({ hasErrored: true, error: e }))
    }

    componentDidMount() {
        this.fetchCats("/api/categories/" + (this.state.pid ? this.state.pid + '/' : ''));
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.match.params.hasOwnProperty('pid')) {
            this.setState({pid: nextProps.match.params.pid});
            this.fetchCats("/api/categories/" + nextProps.match.params.pid + '/');
        } else {
            this.setState({pid: null});
            this.fetchCats("/api/categories/");
        }
     }

    render() {
        return <View> {this.props.children} </View>
    }
}


const mapStateToProps = state => {
    return {
        role: state.userReducer['role'],
        token: state.userReducer['token'],
    }
};

export default connect(
    mapStateToProps,
    null
)(CategoryContainer);