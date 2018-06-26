import React, { Component } from "react"
import { StyleSheet, Text, View, Image, Linking, TouchableHighlight } from "react-native"
import Agenda from "../../components/Agenda"
import ScrollViewWithHeader from "../../components/ScrollViewWithHeader"

export default class Home extends Component {
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
    }
    render() {
        return (
            <ScrollViewWithHeader style={{ flex: 1 }}>
                <View style={styles.containerLive}>
                    <Text style={styles.live}>Actuellement en live !</Text>
                    <Text style={styles.emissionLive}>NELIGER!!!!!</Text>
                    <TouchableHighlight style={styles.twitchLogo} onPress={this.openTwitch}>
                        <Image source={require("../../res/images/twitch.png")} style={{ height: 55, width: 55 }} />
                    </TouchableHighlight>
                </View>
                <View style={{ flex: 1 }}>
                    <Text>Prochainement</Text>
                    <Agenda />
                </View>
            </ScrollViewWithHeader>
        )
    }
}

const styles = StyleSheet.create({
    containerLive: {
        backgroundColor: "#000",
        height: 60,
        position: "relative",
    },
    live: {
        fontSize: 18,
        color: "#FFF",
        fontFamily: "Montserrat-Light",
    },
    emissionLive: {
        fontSize: 25,
        color: "#FFF",
        fontFamily: "Montserrat-Medium",
    },
    twitchLogo: {
        position: "absolute",
        left: "70%",
        top: "5%",
    },
})
