import React from "react"
import { StatusBar } from "react-native"
import { Provider } from "react-redux"
import firebase from "react-native-firebase"

import RootNavigator from "./screens"
import store from "./data/store"
import Device from "./tools/Device"
import Notification from "./tools/Notification"

export default class App extends React.Component {
    componentDidMount() {
        StatusBar.setBarStyle("light-content")
        Notification.createChannel()
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
        firebase.messaging().onMessage((message) => console.log("onMessage", message.data))
        firebase.notifications().onNotificationOpened((notif) => this.handleNotification(notif.notification))
        firebase
            .notifications()
            .getInitialNotification()
            .then((notif) => {
                if (notif) {
                    this.handleNotification(notif.notification)
                    firebase.notifications().cancelAllNotifications()
                }
            })
    }

    handleNotification(notif) {
        console.log("handleNotification", notif)
        if (notif.data && notif.data.action) {
            switch (notif.data.action) {
                case "openTwitch":
                    Device.openTwitch()
                    break
                case "resub":
                    // Renew notification in 30 days
                    const now = new Date().getTime()
                    const nextNotif = new Date(now + 30 * 24 * 3600 * 1000)
                    Notification.renewNotification(nextNotif)
                    Device.openTwitch()
                    break
                default:
                    //nothing
                    break
            }
        }
    }

    render() {
        return (
            <Provider store={store}>
                <RootNavigator />
            </Provider>
        )
    }
}
