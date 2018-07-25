import React from "react";
import PropTypes from 'prop-types';
import { Button, View, Image, Text } from 'react-native';

import PickRoleContainer from '../containers/pick-role'


// <CustomerCheckEntity producer={this.state.producer} customer={this.state.customer} onClick={this.props.customerClicked}/>
//                                    <ProducerCheckEntity producer={this.state.producer} customer={this.state.customer}/>
//style={"fa " + (this.props.customer ? 'fa-check': "")}
/*
class CustomerCheckEntity extends React.Component {
    render() {
        return <Text>''</Text>;
    }
}

// style={"fa " + (this.props.producer ? 'fa-check': "")}
class ProducerCheckEntity extends React.Component {
    render() {
        return <Text>''</Text>;
    }
}
*/
export default class PickRole extends React.Component {
    constructor(props) {
        super(props);
        this.state = { producer: true, customer: false };
    }

    render () {
        return <PickRoleContainer>
            <View>
                <View>
                    <View>
                        <View>
                            <Image source="/static/images/big-logo.png"/>
                        </View>

                        <Text>Укажите чем занимается Ваша компания: продажей или покупкой продуктов питания</Text>
                    </View>


                    <View>
                        <View>
                            <View>
                                <View>
                                    <Text>Для тех, кто торгует продуктами питания</Text>
                                    <Button
                                        onPress={() => this.props.producerClicked}
                                        title="Я - ПОСТАВЩИК"
                                    />
                                </View>

                                <View>
                                    <Text>Для тех, кто закупает продукты питания</Text>
                                    <Button
                                        onPress={() => this.customerClicked}
                                        title="Я - ТОРГОВАЯ ТОЧКА"
                                    />
                                </View>
                            </View>
                            <Button
                                title="Далее"
                                onPress={() => this.props.navigator.navigate('PickRole')}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </PickRoleContainer>
    }
}

PickRole.propTypes = {
    customer: PropTypes.bool,
    producer: PropTypes.bool
};