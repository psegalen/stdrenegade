import firebase from "react-native-firebase"
import { Platform } from "react-native"

const Notification = {
    cancelNotifications: () => firebase.notifications().cancelAllNotifications(),
    createScheduledNotification: (title, body, date) => {
        const notification = new firebase.notifications.Notification()
            .setNotificationId(`RenegadeScheduledNotif${parseInt(Math.random() * 1000000)}`)
            .setTitle(title)
            .setBody(body)

        if (Platform.OS === "android") {
            notification.android.setChannelId("renegade")
        }

        firebase.notifications().scheduleNotification(notification, {
            fireDate: date.getTime(),
        })
    },
}

export default Notification
