import firebase from "react-native-firebase"
import { Platform } from "react-native"
import Storage from "./Storage"

const Notification = {
    cancelNotifications: () => firebase.notifications().cancelAllNotifications(),
    createScheduledNotification: (title, body, date) => {
        const notification = new firebase.notifications.Notification()
            .setNotificationId(`RenegadeScheduledNotif${parseInt(Math.random() * 1000000)}`)
            .setTitle(title)
            .setBody(body)
            .setData({ action: "resub" })

        if (Platform.OS === "android") {
            notification.android.setChannelId("renegade")
        }

        console.log(notification, date)

        firebase
            .notifications()
            .scheduleNotification(notification, {
                fireDate: date.getTime(),
            })
            .then((res) => console.log(res))
    },
    renewNotification: (date) => {
        Storage.setResubDate(date)
        Notification.cancelNotifications()
        Notification.createScheduledNotification(
            "Renegade Resub",
            "Pensez à renouveler votre abonnement Twitch Prime à la chaîne !",
            date
        )
    },
    createChannel: () => {
        if (Platform.OS === "android") {
            const channel = new firebase.notifications.Android.Channel(
                "renegade",
                "Studio Renegade",
                firebase.notifications.Android.Importance.Max
            ).setDescription("Notifications du Studio Renegade")

            firebase.notifications().android.createChannel(channel)
        }
    },
}

export default Notification
