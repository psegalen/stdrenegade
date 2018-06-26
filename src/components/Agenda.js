import React, { Component } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"

/*
BEGIN:VEVENT
DTSTART:20180612T103000Z
DTEND:20180612T121500Z
UID:0eqg6v5btfpikq31h5nochvpak@google.com
DESCRIPTION:Conf. PlayStation E3
LAST-MODIFIED:20180319T151426Z
LOCATION:
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:Rediff Conf. PlayStation E3
TRANSP:OPAQUE
END:VEVENT
*/

export default class Agenda extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: [],
        }
    }

    componentDidMount() {
        fetch({ method: "GET", url: "https://studiorenegade.fr/app_data.json.php" })
            .then((data) => data.json())
            .then((result) => this.setState({ events: result.events }))
    }

    currentDate() {
        const now = new Date()
        const day = now.getDay()
        const month = now.getMonth() + 1
        const year = now.getFullYear()

        return `${day}-${month}-${year}`
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={styles.title}>Agenda</Text>
                <Text>{this.currentDate()}</Text>
                {this.state.events.map(
                    (event) =>
                        event.type === "program" && new Date().getTime() < event.time_start * 1000 ? (
                            <View
                                key={event.id}
                                style={{
                                    height: 80,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderBottomWidth: 1,
                                }}
                            >
                                <Text>{event.name}</Text>
                                <Text>Début : {new Date(event.time_start * 1000).toLocaleString()}</Text>
                            </View>
                        ) : (
                            undefined
                        )
                )}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontFamily: "Montserrat-Light",
        fontSize: 18,
    },
})
