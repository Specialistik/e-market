import React from "react";
import { Link } from 'react-router-dom';
import { View, Text, TextInput, Button, ListView } from 'react-native';

import CategoryContainer from '../containers/categories';

export default class Categories extends React.Component {
    constructor(props) {
        super(props);
        /*
        this.state = {
            pid: (this.props.hasOwnProperty('match') && this.props.match.params.hasOwnProperty('pid') ? this.props.match.params.pid : null),
            categories: [],
            cat_name: ''
        };
        this.fetchCats = this.fetchCats.bind(this);
        */
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
                                dataSource={this.state.categories}
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
