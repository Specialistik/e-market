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
                { this.props.pid ?
                    <View>
                        <Text>{ this.props.cat_name }</Text>
    
                        <Link to={ '/categories/' }>
                            <View/>
                            Назад к категориям
                        </Link>
                    </View> :''
                }
                <View>
                    <View>
                        {this.props.categories.map((category, index) => (
                            <View>
                                <View>
                                    <Link to={ (!this.props.pid ? '/categories/' : '/products/') + category.id + '/'}>
                                        <Image source={ category.image } />
                                        { category.name }
                                    </Link>
                                    { this.props.role === 'customer'?
                                        <View>
                                            { category.unseen }
                                        </View>:''
                                    }
                                </View>

                                <Text> { category.name }</Text>
                            </View>
                        ))}
    
                        <View>
                            <ListView 
                                dataSource={this.state.categories}
                                renderRow={(rowData) => (
                                <Text>
                                    <Link to={ (!this.props.pid ? '/categories/' : '/products/') + rowData.id + '/'}>
                                        <Image source={ rowData.image } />
                                    </Link>
                                </Text>)}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </CategoryContainer>
    }
}
