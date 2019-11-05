import React, { Component } from "react"
import { StyleSheet, Text, Button } from "react-native"
import DatePicker from "react-native-date-picker"

import ScrollViewWithHeader from "../components/ScrollViewWithHeader"
import Storage from "../tools/Storage"
import Notification from "../tools/Notification"

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#F2EDE9",
    },
    textContainer: {
        textAlign: "justify",
        fontSize: 16,
        marginTop: 10,
        fontFamily: "Montserrat-Light",
        color: "#000",
    },
})

class User extends Component {
    state = { date: new Date(), storedDate: undefined }

    componentDidMount() {
        Storage.getResubDate().then((date) => this.setState({ storedDate: date, date: date || this.state.date }))
    }

    handleResubDate() {
        Storage.setResubDate(this.state.date)
        Notification.cancelNotifications()
        Notification.createScheduledNotification(
            "Renegade Resub",
            "Pensez à renouveler votre abonnement Twitch Prime à la chaîne !",
            this.state.date
        )
        this.setState({ storedDate: this.state.date })
    }

    render() {
        return (
            <ScrollViewWithHeader style={styles.root} padding={16}>
                <Text style={styles.textContainer}>Fin de mon abonnement Prime à la chaîne :</Text>
                <Text style={{ ...styles.textContainer, fontSize: 20 }}>
                    {this.state.storedDate
                        ? `Le ${this.state.storedDate.toLocaleDateString()} à ${this.state.storedDate.getHours()}h${this.state.storedDate.getMinutes()}`
                        : "A définir"}
                </Text>
                <DatePicker
                    date={this.state.date}
                    onDateChange={(date) => this.setState({ date })}
                    locale="fr"
                    style={{ marginTop: 10, alignSelf: "center" }}
                    minuteInterval={5}
                />
                <Button onPress={this.handleResubDate.bind(this)} title="Définir un rappel" />
            </ScrollViewWithHeader>
        )
    }
}

export default User
