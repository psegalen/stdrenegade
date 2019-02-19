import { Platform, StatusBar, Linking } from "react-native"
import DeviceInfo from "react-native-device-info"

const Device = {
    getStatusBarHeight() {
        if (Platform.OS === "ios") {
            return DeviceInfo.getModel() === "iPhone X" ? 44 : 20
        }
        return StatusBar.currentHeight
    },
    getBackArrowPosition() {
        return Platform.OS === "ios" ? 30 : 10
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
