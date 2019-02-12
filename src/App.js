import React from "react"
import { StatusBar } from "react-native"
import { Provider } from "react-redux"
import firebase from "react-native-firebase"

import RootNavigator from "./screens"
import store from "./data/store"

export default class App extends React.Component {
    componentDidMount() {
        StatusBar.setBarStyle("light-content")
        firebase
            .messaging()
            .getToken()
            .then((fcmToken) => {
                if (fcmToken) {
                    // user has a device token
                    console.log(fcmToken)
                } else {
                    // user doesn't have a device token yet
                    console.log("No token for now...")
                }
            })
        firebase.messaging().onTokenRefresh((fcmToken) => {
            // Process your token as required
            console.log(fcmToken)
        })
        firebase
            .messaging()
            .hasPermission()
            .then((enabled) => {
                if (enabled) {
                    // user has permissions
                    console.log("Permission OK!!!")
                } else {
                    // user doesn't have permission
                    console.log("Permission KO... :(")
                    firebase
                        .messaging()
                        .requestPermission()
                        .then(() => {
                            // User has authorised
                            console.log("Yeepee!!!")
                        })
                        .catch((error) => {
                            // User has rejected permissions
                            console.log("Rejected :'(")
                        })
                }
            })
    }

    render() {
        return (
            <Provider store={store}>
                <RootNavigator />
            </Provider>
        )
    }
}
