import React from "react";
import PropTypes from "prop-types";
import { View, Button, Picker } from "react-native";
import { FormInput } from 'react-native-elements';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import CompanyInfoFormContainer from "../containers/company-info-form-container";
import * as AuthActionCreators from "../actions/auth";

class AddressForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <CompanyInfoFormContainer>
            <Text className="title_edit angle_right">Общие данные о компании</Text>
            <View className="wrapp_form_box clearfix">
                <View className="box_form_row clearfix">
                    <View className="box_form_half">
                        <View className="form_box_offset">
                            <View className="wrapp_castom_select">
                                <Picker data-placeholder="Краткая организационно-правовая форма" name="org_type_short" id="org_type_short" required>
                                    <Picker.Item label="ИП" value="ИП" />
                                    <Picker.Item label="ООО" value="ООО" />
                                </Picker>
                            </View>
                        </View>

                        <View className="form_box_offset">
                            <View className="wrapp_castom_select">
                                <Picker placeholder="Полная организационно-правовая форма">
                                    <Picker.Item label="ИП" value="ИП" />
                                    <Picker.Item label="ООО" value="ООО" />
                                </Picker>
                            </View>
                        </View>

                        <View className="form_box_offset">
                            <FormInput name="inn" placeholder="ИНН" value="{{ profile.inn }}" minlength="10" className="number_type_clear" />
                        </View>
                    </View>

                    <View className="box_form_half">
                        <View className="form_box_offset">
                            <View className="wrapp_castom_select">
                                <Picker data-placeholder="Наименование учредительного документа" name="legal_act">
                                    <Picker.Item label="ИП" value="ИП" />
                                    <Picker.Item label="ООО" value="ООО" />
                                </Picker>
                            </View>
                        </View>

                        <View className="form_box_offset">
                            <FormInput className="number_type_clear" name="ogrn" placeholder="ОГРН" minlength="13" />
                        </View>

                        <View className="form_box_offset">
                            <FormInput className="number_type_clear" name="kpp" placeholder="КПП" minlength="9" data-mask="000000000" />
                        </View>
                    </View>
                </View>

                <View className="align_right">
                    <Button className="btn hight_orange submit_button" type="submit">Сохранить</Button>
                </View>
            </View>
        </CompanyInfoFormContainer>
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
)(CompanyInfoFormContainer);

CompanyInfoFormContainer.propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
    signUser: PropTypes.func,
    handleEmailChange: PropTypes.func,
    handlePasswordChange: PropTypes.func
};