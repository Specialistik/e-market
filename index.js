import React from "react";
import { AppRegistry, Linking } from "react-native";

class TheSkladApp extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return Linking.openURL("https://app.the-sklad.ru");
    }
}

AppRegistry.registerComponent("the_sklad", () => TheSkladApp);