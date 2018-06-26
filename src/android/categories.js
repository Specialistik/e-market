import React from "react";
import { Link } from 'react-router-dom';
import { View, Text, ListView, Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CategoryContainer from '../containers/categories';
import * as AuthActionCreators from "../actions/auth";

class Categories extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <CategoryContainer>
            <View>
                {this.props.pid?
                    <View>
                        <Text>{ this.props.cat_name }</Text>
    
                        <Link to={ '/categories/' }>
                            <Text>Назад к категориям</Text>
                        </Link>
                    </View> :<Text>' '</Text>
                }
                <View>
                    <View>
                        {this.props.categories.map((category, index) => (
                            <View>
                                <View>
                                    <Link to={ (!this.props.pid ? '/categories/' : '/products/') + category.id + '/'}>
                                        <Image source={ category.image }/>
                                        <Text>{ category.name }</Text>
                                    </Link>
                                    { this.props.role === 'customer'?
                                        <View>
                                            <Text>{ category.unseen }</Text>
                                        </View>:<Text>' '</Text>
                                    }
                                </View>

                                <Text>{ category.name }</Text>
                            </View>
                        ))}
    
                        <View>
                            <ListView 
                                dataSource={this.props.categories}
                                renderRow={(rowData) => (
                                    <Link to={ (!this.props.pid ? '/categories/' : '/products/') + rowData.id + '/'}>
                                        <Image source={ rowData.image }/>
                                    </Link>
                                )}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </CategoryContainer>
    }
}

const mapStateToProps = (state) => {
    return {
        role: state.userReducer['role'],
        token: state.userReducer['token'],
    }
};

const mapDispatchToProps = (dispatch) => {
    return { actions: bindActionCreators(AuthActionCreators, dispatch) }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Categories);

Categories.propTypes = {
    pid: PropTypes.number,
    cat_name: PropTypes.string
};