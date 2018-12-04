import React, { Component } from "react"
import { View, Text, StyleSheet, Linking, Image, TouchableOpacity, Alert } from "react-native"
import { connect } from "react-redux"
import { remainingTime } from "../tools/Date"
import { storeRenegadeData, fetchRenegadeData } from "../data/renegade/actions"
import { ProgramRoutes } from "../screens/programs"
import { Routes } from "../screens"
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons"

const TouchOrNot = (props) =>
    props.touchable ? (
        <TouchableOpacity onPress={props.onPress} style={props.style}>
            {props.children}
        </TouchableOpacity>
    ) : (
        <View style={props.style}>{props.children}</View>
    )

class Agenda extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentLiveEvent: null,
        }
    }

    componentDidMount() {
        this.props.fetchRenegadeData()
        fetch("https://studiorenegade.fr/app_data.json.php")
            .then((data) => data.json())
            .then((result) => this.props.storeRenegadeData(result))
            .catch((err) => Alert.alert("Oh non !", err.message))
        this.liveEventInterval = setInterval(() => this.setState({ currentLiveEvent: this.getLiveEvent() }), 1000)
    }

    componentWillUnmount() {
        if (this.liveEventInterval) clearInterval(this.liveEventInterval)
    }

    currentDate() {
        const now = new Date()
        const day = now.getDay()
        const month = now.getMonth() + 1
        const year = now.getFullYear()

        return `${day}-${month}-${year}`
    }

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

    getLiveEvent() {
        const now = new Date().getTime()
        return this.props.renegade.events.find((event) => event.time_start * 1000 < now && event.time_end * 1000 > now)
    }

    getProgramFromEvent(event) {
        return this.props.renegade.programs.find((program) => program.id === event.program)
    }

    getStreamerFromEvent(event) {
        return this.props.renegade.streamers.find(
            (streamer) => streamer.id === (event.streamers ? event.streamers[0] : undefined)
        )
    }

    renderProgram(event) {
        const program = this.getProgramFromEvent(event)
        const streamer = this.getStreamerFromEvent(event)
        return (
            <TouchOrNot
                key={event.id}
                style={styles.programRoot}
                touchable={program !== undefined}
                onPress={() =>
                    this.props.navigation.navigate(ProgramRoutes.programsDetails, {
                        programDetail: program,
                        backRoute: Routes.home,
                    })
                }
            >
                <Image
                    style={styles.programLogo}
                    source={{
                        uri: program
                            ? program.logo
                            : streamer
                                ? streamer.logo
                                : "https://studiorenegade.fr/static/img/emission-replay-90.jpg",
                    }}
                />
                <View style={styles.programInfo}>
                    <Text style={styles.programName}>
                        {program ? program.name : event.type === "repeat" ? event.description : event.name}
                    </Text>
                    <Text style={styles.programTime}>{remainingTime(event.time_start * 1000)}</Text>
                </View>
                {program !== undefined && (
                    <IconMCI name="chevron-right" size={30} color="#000" style={{ marginRight: 10 }} />
                )}
            </TouchOrNot>
        )
    }

    render() {
        const liveEvent = this.state.currentLiveEvent
        const program = liveEvent ? this.getProgramFromEvent(liveEvent) : null
        const streamer = liveEvent ? this.getStreamerFromEvent(liveEvent) : null
        const logo = program
            ? program.logo
            : streamer
                ? streamer.logo
                : "https://studiorenegade.fr/static/img/emission-replay-90.jpg"
        return (
            <View style={styles.root}>
                {liveEvent && (
                    <TouchableOpacity style={styles.touchLive} onPress={this.openTwitch}>
                        <View style={styles.containerLive}>
                            <Image style={styles.liveLogo} source={{ uri: logo }} />
                            <View style={styles.programInfo}>
                                <Text style={styles.live}>Actuellement en live !</Text>
                                <Text style={styles.emissionLive}>
                                    {program
                                        ? program.name
                                        : liveEvent.type === "repeat"
                                            ? liveEvent.description
                                            : liveEvent.name}
                                </Text>
                            </View>
                            <Image source={require("../res/images/twitch.png")} style={{ height: 50, width: 50 }} />
                        </View>
                    </TouchableOpacity>
                )}
                <Text style={styles.title}>Agenda</Text>
                {this.props.renegade.events.map(
                    (event) => (new Date().getTime() < event.time_start * 1000 ? this.renderProgram(event) : undefined)
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#F2EDE9",
    },
    title: {
        fontFamily: "Montserrat-Medium",
        fontSize: 20,
        textAlign: "center",
        paddingVertical: 10,
        color: "#000",
    },
    touchLive: {
        height: 60,
    },
    containerLive: {
        height: 60,
        backgroundColor: "#000",
        position: "relative",
        flexDirection: "row",
        paddingHorizontal: 10,
        alignItems: "center",
    },
    live: {
        fontSize: 16,
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
    programRoot: {
        height: 80,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    programLogo: {
        height: 50,
        width: 50,
        borderRadius: 25,
        marginHorizontal: 20,
    },
    liveLogo: {
        height: 50,
        width: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    programInfo: {
        flex: 1,
    },
    programName: {
        fontFamily: "Montserrat-Medium",
        color: "#000",
        fontSize: 20,
    },
    programTime: {
        fontFamily: "Montserrat-Light",
        color: "#000",
    },
})

const mapStateToProps = ({ renegade }) => ({
    renegade,
})

export default connect(
    mapStateToProps,
    { storeRenegadeData, fetchRenegadeData }
)(Agenda)
