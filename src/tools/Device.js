import { Platform, StatusBar } from "react-native"
import DeviceInfo from "react-native-device-info"

const Device = {
    getStatusBarHeight() {
        if (Platform.OS === "ios") {
            return DeviceInfo.getModel() === "iPhone X" ? 44 : 20
        }
        return StatusBar.currentHeight
    },
}

export default Device
