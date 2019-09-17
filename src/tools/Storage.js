import { AsyncStorage } from "react-native"

const storageKeys = {
    RENEGADE_RESUB_DATE: "RENEGADE_RESUB_DATE",
}

const Storage = {
    set: (key, value) => AsyncStorage.setItem(key, value),
    get: (key) => AsyncStorage.getItem(key),
    setResubDate: (date) => Storage.set(storageKeys.RENEGADE_RESUB_DATE, `${date.getTime()}`),
    getResubDate: () =>
        Storage.get(storageKeys.RENEGADE_RESUB_DATE).then((value) => value && new Date(parseInt(value))),
}

export default Storage
