import React, { Component } from "react"
import { StyleSheet, Text, View, Image } from "react-native"

import ScrollViewWithHeader from "../../components/ScrollViewWithHeader"
import { remainingTime } from "../../tools/Date"

export default class ProgramsDetails extends Component {
    static navigationOptions = {
        title: "Détail Émission",
    }

    render() {
        const { params } = this.props.navigation.state
        const programDescription = params.programDetail.description
        const logoEmission = params.programDetail.logo
        return (
            <ScrollViewWithHeader style={{ flex: 1 }} navigation={this.props.navigation}>
                <View style={styles.container}>
                    <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
                        <Image source={{ uri: logoEmission }} style={styles.logo} />
                    </View>
                    <Text style={styles.title}>{params.programDetail.name}</Text>
                    <Text style={styles.textContainer}>{programDescription}</Text>
                    <Text style={styles.title}>Streameurs</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", margin: 10 }}>
                        {params.programDetail.anim.map((streamer) => (
                            <View key={streamer.id}>
                                <Image source={{ uri: streamer.logo }} style={styles.streamerLogo} />
                            </View>
                        ))}
                    </View>
                    {params.programDetail.nextLive ? (
                        <Text style={styles.textContainer}>Prochain live : {params.programDetail.nextLive}</Text>
                    ) : (
                        undefined
                    )}
                </View>
            </ScrollViewWithHeader>
        )
    }
}

const styles = StyleSheet.create({
    logo: {
        marginTop: 10,
        borderRadius: 40,
        height: 80,
        width: 80,
    },
    streamerLogo: {
        borderRadius: 20,
        height: 40,
        width: 40,
    },
    container: {
        padding: 10,
    },
    title: {
        fontFamily: "Montserrat-Light",
        color: "#000",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 10,
    },
    textContainer: {
        textAlign: "justify",
        fontSize: 16,
        marginTop: 10,
    },
    streameur: {
        height: 70,
        width: 70,
        borderRadius: 35,
    },
})
