import { Platform, StatusBar, Linking } from "react-native"
import DeviceInfo from "react-native-device-info"

const Device = {
    isAndroid() {
        return Platform.OS === "android"
    },
    getStatusBarPadding() {
        return Platform.select({ ios: 0, android: StatusBar.currentHeight || 0 })
    },
    getStatusBarHeight() {
        if (Platform.OS === "ios") {
            return DeviceInfo.hasNotch() ? 40 : 20
        }
        return StatusBar.currentHeight
    },
    getBackArrowPosition(statusBarHeight) {
        return Platform.OS === "ios" ? statusBarHeight + 10 : 10
    },
    getDeviceName() {
        return DeviceInfo.getDeviceName()
    },
    getDeviceModel() {
        return `${DeviceInfo.getBrand()} - ${DeviceInfo.getModel()}`
    },
    openTwitch() {
        const twitchWeb = "https://twitch.tv/studiorenegade"
        const twitchApp = "twitch://stream/studiorenegade"
        Linking.canOpenURL(twitchApp).then((canOpen) => {
            if (canOpen) {
                Linking.openURL(twitchApp)
            } else {
                Linking.openURL(twitchWeb)
            }
        })
    },
}

export default Device
