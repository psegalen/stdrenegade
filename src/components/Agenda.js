import React, { Component } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, FlatList } from "react-native"
import { connect } from "react-redux"
import { remainingTime } from "../tools/Date"
import { storeRenegadeData, fetchRenegadeData } from "../data/renegade/actions"
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons"
import Device from "../tools/Device"
import { HomeRoutes } from "../screens/home"

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
        this.fetchData()
        this.liveEventInterval = setInterval(() => {
            const currentLiveEvent = this.getLiveEvent()
            if (
                this.state.currentLiveEvent === null ||
                (currentLiveEvent &&
                    this.state &&
                    this.state.currentLiveEvent &&
                    this.state.currentLiveEvent.id !== currentLiveEvent.id)
            )
                this.setState({ currentLiveEvent })
        }, 1000)
    }

    componentWillUnmount() {
        if (this.liveEventInterval) clearInterval(this.liveEventInterval)
    }

    fetchData() {
        this.props.fetchRenegadeData()
        fetch("https://studiorenegade.fr/app_data.json.php")
            .then((data) => data.json())
            .then((result) => {
                setTimeout(() => this.props.storeRenegadeData(result), 1000)
            })
            .catch((err) => Alert.alert("Oh non !", err.message))
    }

    currentDate() {
        const now = new Date()
        const day = now.getDay()
        const month = now.getMonth() + 1
        const year = now.getFullYear()

        return `${day}-${month}-${year}`
    }

    getLiveEvent() {
        const now = new Date().getTime()
        return (
            this.props.renegade.events.find((event) => event.time_start * 1000 < now && event.time_end * 1000 > now) ||
            null
        )
    }

    getStreamFromEvent(event) {
        return this.props.renegade.streams.find((stream) => stream.id === event.stream)
    }

    getProgramFromEvent(event) {
        return this.props.renegade.programs.find((program) => program.id === event.program)
    }

    getStreamerFromEvent(event) {
        return this.props.renegade.streamers.find(
            (streamer) => streamer.id === (event.streamers ? event.streamers[0] : undefined)
        )
    }

    getStreamers(streamersId) {
        return streamersId.map((id) => this.props.renegade.streamers.find((streamer) => streamer.id === id))
    }

    renderProgram(event) {
        const program = this.getProgramFromEvent(event)
        const streamer = this.getStreamerFromEvent(event)
        const stream = this.getStreamFromEvent(event)
        const twitchIcon = require("../res/images/twitch_round.png")
        const srLogoUri = program
            ? program.logo
            : stream
                ? stream.logo
                : streamer
                    ? streamer.logo
                    : event.type === "repeat"
                        ? "https://studiorenegade.fr/static/img/emission-replay-90.jpg"
                        : undefined
        return (
            <TouchOrNot
                key={event.id}
                style={styles.programRoot}
                touchable={program !== undefined || stream !== undefined}
                onPress={() =>
                    this.props.navigation.navigate(HomeRoutes.homeDetails, {
                        programDetail: program || stream,
                        streamers: event.streamers ? this.getStreamers(event.streamers) : [],
                    })
                }
            >
                <Image style={styles.programLogo} source={srLogoUri ? { uri: srLogoUri } : twitchIcon} />
                <View style={styles.programInfo}>
                    <Text style={styles.programName}>
                        {program ? program.name : event.type === "repeat" ? event.description : event.name}
                    </Text>
                    <Text style={styles.programTime}>{remainingTime(event.time_start * 1000)}</Text>
                </View>
                {(program !== undefined || stream !== undefined) && (
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
                    <TouchableOpacity style={styles.touchLive} onPress={Device.openTwitch}>
                        <View style={styles.containerLive}>
                            <Image style={styles.liveLogo} source={{ uri: logo }} />
                            <View style={styles.programInfo}>
                                <Text style={styles.live}>Actuellement en live !</Text>
                                <Text style={styles.emissionLive} numberOfLines={1}>
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
                <FlatList
                    data={this.props.renegade.events.filter((event) => new Date().getTime() < event.time_start * 1000)}
                    renderItem={({ item }) => this.renderProgram(item)}
                    refreshing={this.props.renegade.isLoading}
                    style={{ flex: 1 }}
                    onRefresh={() => this.fetchData()}
                    keyExtractor={(item) => item.id}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#F2EDE9",
        flex: 1,
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
