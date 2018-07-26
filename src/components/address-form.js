import React from "react";
import PropTypes from "prop-types";
import { View, FormInput } from "react-native";
import { FormInput } from 'react-native-elements';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import AddressFormContainer from "../containers/address-form-container";
import * as AuthActionCreators from "../actions/auth";

class AddressForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <AddressFormContainer>
            <Text className="title_edit angle_right">Юридический адрес</Text>
            <View className="wrapp_form_box clearfix">
                <View className="box_form_row clearfix geo_container">
                    <View className="box_form_half">

                        <View className="form_box_offset" id="location_field">
                            <FormInput name="full_address" className="geo_full autocomplete" id="autocomplete" onFocus="geolocate()" placeholder="Город, улица, дом" />
                        </View>

                        <View className="form_box_offset">

                            <View className="form_row clearfix">

                                <View className="form_col half">
                                    <View className="error_form_container">
                                        <FormInput id="postal_code" name="index" className="autocomplete_index" placeholder="Индекс" readonly minlength="6" />
                                    </View>
                                </View>

                                <View className="form_col half">
                                    <FormInput className="autocomplete_region" name="region" placeholder="Регион" readonly />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className="box_form_half">

                        <View className="form_box_offset">

                            <View className="form_row clearfix">

                                <View className="form_col half">
                                    <View className="error_form_container">
                                        <FormInput id="locality" name="city" className="autocomplete_city" placeholder="Город / Населенный пункт" readonly required />
                                    </View>
                                </View>

                                <View className="form_col half">
                                    <View className="error_form_container">
                                        <FormInput id="route" name="street" placeholder="Улица" className="autocomplete_street" readonly required />
                                    </View>
                                </View>

                            </View>

                        </View>

                        <View className="form_box_offset">

                            <View className="form_row clearfix">

                                <View className="form_col quarter">
                                    <View className="error_form_container">
                                        <FormInput id="street_number" name="house" className="autocomplete_house" placeholder="Дом" readonly required />
                                    </View>
                                </View>

                                <View className="form_col quarter">
                                    <FormInput name="block" placeholder="Корпус" className="autocomplete_block" />
                                </View>

                                <View className="form_col quarter">
                                    <FormInput name="structure" placeholder="Строение" className="autocomplete_structure" />
                                </View>

                                <View className="form_col quarter">
                                    <FormInput name="flat" placeholder="Кв. / Офис" className="autocomplete_flat" />
                                </View>

                            </View>

                        </View>

                    </View>
                </View>

                <View className="align_right">
                    <button className="btn hight_orange submit_button" type="submit">Сохранить</button>
                </View>
            </View>
        </AddressFormContainer>
    }
}

const mapStateToProps = (state) => {
    return {
        role: state.userReducer["role"],
        token: state.userReducer["token"],
    };
};

const mapDispatchToProps = (dispatch) => {
    return { actions: bindActionCreators(AuthActionCreators, dispatch) };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInForm);

SignInForm.propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
    signUser: PropTypes.func,
    handleEmailChange: PropTypes.func,
    handlePasswordChange: PropTypes.func
};