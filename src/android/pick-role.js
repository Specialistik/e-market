import React from "react";
import PropTypes from "prop-types";
import { Button, View, Image, Text } from "react-native";

import PickRoleContainer from "../containers/pick-role";

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
                                        onPress={() => this.props.customerClicked}
                                        title="Я - ТОРГОВАЯ ТОЧКА"
                                    />
                                </View>
                            </View>
                            <Button
                                title="Далее"
                                onPress={() => this.props.navigator.navigate("PickRole")}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </PickRoleContainer>;
    }
}

PickRole.propTypes = {
    customer: PropTypes.bool,
    producer: PropTypes.bool,
    customerClicked: PropTypes.bool, 
    producerClicked: PropTypes.bool,
    navigator: PropTypes.navigator
};