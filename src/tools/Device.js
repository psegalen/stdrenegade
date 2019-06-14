import { Platform, StatusBar, Linking } from "react-native"
import DeviceInfo from "react-native-device-info"

const Device = {
    isAndroid() {
        return Platform.OS === "android"
    },
    getStatusBarHeight() {
        if (Platform.OS === "ios") {
            return DeviceInfo.getDeviceId().indexOf("iPhone11") === 0 ||
                DeviceInfo.getDeviceId() === "iPhone10,3" ||
                DeviceInfo.getDeviceId() === "iPhone10,6"
                ? 40
                : 20
        }
        return StatusBar.currentHeight
    },
    getBackArrowPosition() {
        return Platform.OS === "ios" ? Device.getStatusBarHeight() + 10 : 10
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
