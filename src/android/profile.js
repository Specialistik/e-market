import React from "react";
import PropTypes from 'prop-types';
import { Button, View, Image, Text } from 'react-native';

import ProfileContainer from '../containers/profile-container'

export default class PickRole extends React.Component {
    constructor(props) {
        super(props);
        this.state = { producer: true, customer: false };
    }

    render () {
        return <ProfileContainer>
            <View className="wrapp_content">
                <View className="box_title_button">
                    <Text className="title_line">Данные о компании</Text>

                    <Link href="/profile/skip_creation/" className="btn light_orange icon_right large_width">
                    <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                        Пропустить заполнение данных
                    </Link>
                </View>

                <Text className="attention_txt left">
                    Для получения доступа к совершению сделок на площадке необходимо заполнить форму
                </Text>
                    
                <View className="align_right">
                    <Link href="/profile/skip_creation/" className="btn light_orange icon_right large_width" id="create_profile">
                    <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                        Продолжить
                    </Link>
                </View>
            </View>
        </ProfileContainer>
    }
}

PickRole.propTypes = {
    customer: PropTypes.bool,
    producer: PropTypes.bool
};