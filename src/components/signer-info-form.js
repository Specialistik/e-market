import React from "react";
import PropTypes from "prop-types";
import { View, Button, Picker } from "react-native";
import { FormInput } from 'react-native-elements';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import SignerInfoFormContainer from "../containers/signer-info-form-container";
import * as AuthActionCreators from "../actions/auth";

class SignerInfoForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <SignerInfoFormContainer>
                    <View className="wrapp_form_box clearfix">
                        <View className="box_form_row clearfix">
                                <View className="box_form_half">

                                    <Text className="subtitle_edit">Данные лица, от имени которого будут заключаться сделки</Text>

                                    <View className="form_box_offset">
                                        <View className="error_form_container">
                                            <FormInput required placeholder="Фамилия" name="surname" />
                                        </View>
                                    </View>

                                    <View className="form_box_offset">
                                        <View className="error_form_container">
                                            <FormInput required placeholder="Имя" name="name" />
                                        </View>
                                    </View>

                                    <View className="form_box_offset">
                                        <View className="error_form_container">
                                            <FormInput required placeholder="Отчество" name="patronymic" />
                                        </View>
                                    </View>

                                    <View className="form_box_offset">
                                        <View className="form_row clearfix">
                                            <View className="form_col half">
                                                <View className="wrapp_datepicker_calendar error_form_container">
                                                    <FormInput required name="birth_date" className="datepicker-here" placeholder="Дата рождения" />
                                                </View>
                                            </View>
                                        </View>

                                    </View>

                                    <View className="form_box_offset">
                                        <FormInput name="position" placeholder="Должность" />
                                    </View>
                                </View>

                                <View className="box_form_half">
                                    <Text className="subtitle_edit">Документ, подтверждающий личность (паспорт)</Text>
                                    <View className="form_box_offset">
                                        <View className="form_row clearfix">
                                            <View className="form_col half">
                                                <View className="error_form_container">
                                                    <FormInput required placeholder="Серия" name="series" />
                                                </View>
                                            </View>

                                            <View className="form_col half">
                                                <View className="error_form_container">
                                                    <FormInput required placeholder="Номер" name="number" />
                                                </View>
                                            </View>

                                        </View>

                                    </View>

                                    <View className="form_box_offset">
                                        <View className="error_form_container">
                                            <FormInput required placeholder="Кем выдан" name="issued_by" />
                                        </View>
                                    </View>

                                    <View className="form_box_offset">
                                        <View className="wrapp_datepicker_calendar error_form_container">
                                            <FormInput required name="issued_date" className="datepicker-here" placeholder="Дата выдачи" />
                                        </View>
                                    </View>

                                    <View className="form_box_offset">
                                        <Text className="label1">
                                            Прикрепите документ, подтверждающий право подписи (доверенность),
                                            либо протокол о назначении директором
                                        </Text>

                                        <View className="select_file">
                                            <Link href="{{ profile.identity_document.document.url }}" download>Скачать файл</Link>
                                            <FormInput type="file" name="document" value="Выберите файл" />
                                            <Text className="file_notselected">Выберите файл</Text>
                                        </View>

                                        <View className="wrapp_privacy_policy">
                                            <FormInput type="checkbox" id="privacy_policy" name="privacy_policy" checked />
                                            <Text for="privacy_policy"></Text>

                                            <Text for="privacy_policy" className="privacy_policy_txt">
                                                Я даю
                                                <Link href="javascript:;">согласие на обработку персональных данных</Link>
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                        </View> <View className="align_right">
                            <Button type="submit" className="btn hight_orange submit_button">Сохранить</Button>
                        </View>

                    </View>
                
        </SignerInfoFormContainer>
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
)(SignerInfoForm);

SignerInfoForm.propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
    signUser: PropTypes.func,
    handleEmailChange: PropTypes.func,
    handlePasswordChange: PropTypes.func
};