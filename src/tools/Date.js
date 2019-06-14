export const remainingTime = (timestamp) => {
    const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
    const now = new Date()
    const then = new Date(timestamp)
    const diff = timestamp - now.getTime()
    if (then.toDateString() == now.toDateString()) {
        // Later today
        return `Aujourd'hui à ${then.getHours()}h${zeroPad(then.getMinutes())}`
    }
    if (diff < 48 * 3600 * 1000 && then.getDay() === (now.getDay() + 1) % 7) {
        // Tomorrow
        return `Demain à ${then.getHours()}h${zeroPad(then.getMinutes())}`
    }
    return `${days[then.getDay()]} ${then.getDate()} à ${then.getHours()}h${zeroPad(then.getMinutes())}`
}

const zeroPad = (number) => {
    return number > 9 ? `${number}` : `0${number}`
}
