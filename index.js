import React from "react";
import { AppRegistry, View } from "react-native";
import { createStackNavigator } from "react-navigation";
import { Provider, connect } from "react-redux";
//import Styles from "./src/android/styles";

//import PickRole from "./src/android/pick-role";
import SignIn from "./src/android/sign-in";
//import SignUp from "./src/android/sign-up";
//import IndexContainer from "./src/android/index";

import configureStore from "./src/store";

const AppNavigator = createStackNavigator({
    //PickRole: PickRole,
    //SignUp: SignUp,
    SignIn: SignIn,
}, { initialRouteName: "SignIn"});
const store = configureStore(AppNavigator);

class TheSkladApp extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <Provider store={store}>
            <AppNavigator />
        </Provider>;
    }
}

const mapStateToProps = (state) => ({
    state: state.nav,
});

connect(mapStateToProps)(TheSkladApp);

AppRegistry.registerComponent("the_sklad", () => TheSkladApp);