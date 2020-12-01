import React from "react"
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from "react-native"
import IconII from "react-native-vector-icons/Ionicons"
import {StreamerRoutes} from "../routes"
import { connect } from "react-redux"

import ScrollViewWithHeader from "../../components/ScrollViewWithHeader"

const ProgramsDetails = (props) => {
    const { params } = props.navigation.state
    const programDetail =  props.renegade.programs.find(program => program.id === params.programId) || params.programDetail
    return (
        <ScrollViewWithHeader style={styles.root} navigation={props.navigation}>
            <View style={styles.container}>
                <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
                    <Image source={{ uri: programDetail.logo }} style={styles.logo} />
                </View>
                <Text style={styles.title}>{programDetail.name}</Text>
                {programDetail.nextLive ? (
                    <Text style={[styles.textContainer, { alignSelf: "center" }]}>
                        Prochain live : {programDetail.nextLive}
                    </Text>
                ) : (
                    undefined
                )}
                <Text style={styles.textContainer}>{programDetail.description}</Text>
                {programDetail.anim && programDetail.anim.length > 0 ? (
                    <View>
                        <Text style={styles.title}>Streameurs</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-around", margin: 10 }}>
                            {programDetail.anim.map((streamer) => (
                                <TouchableOpacity 
                                key={streamer.id}
                                onPress={() =>
                                props.navigation.navigate(StreamerRoutes.streamersDetails, {
                                streamerId : streamer.id
                                    })
                                }
                                >
                                    <Image source={{ uri: streamer.logo }} style={styles.streamerLogo} />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ) : (
                    undefined
                )}
                {programDetail.videos && programDetail.videos.length > 0 ? (
                    <View>
                        <Text style={styles.title}>Dernières émissions</Text>
                        <View style={{ marginHorizontal: 10, alignContent: "center" }}>
                            {programDetail.videos.map((video) => (
                                <TouchableOpacity
                                    key={video.id}
                                    style={{ marginVertical: 10 }}
                                    onPress={() => Linking.openURL(video.url)}
                                >
                                    <Image source={{ uri: video.photo }} style={styles.youtubePhoto} />
                                    <Text style={styles.youtubeTitle}>{video.title}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ) : (
                    undefined
                )}
                {programDetail.url_youtube ? (
                    <TouchableOpacity
                        onPress={() => Linking.openURL(programDetail.url_youtube)}
                        style={{ flexDirection: "row", marginTop: 8, alignItems: "center" }}
                    >
                        <View
                            style={{
                                backgroundColor: "#000",
                                width: 30,
                                height: 30,
                                borderRadius: 15,
                                alignItems: "center",
                                justifyContent: "center",
                                marginRight: 8,
                                paddingTop: 3,
                            }}
                        >
                            <IconII name="logo-youtube" color="#F2EDE9" size={20} />
                        </View>
                        <Text style={[styles.textContainer, { marginTop: 0 }]}>VOD YouTube</Text>
                    </TouchableOpacity>
                ) : (
                    undefined
                )}
                {programDetail.url_rss ? (
                    <TouchableOpacity
                        onPress={() => Linking.openURL(programDetail.url_rss)}
                        style={{ flexDirection: "row", marginTop: 8, alignItems: "center" }}
                    >
                        <View
                            style={{
                                backgroundColor: "#000",
                                width: 30,
                                height: 30,
                                borderRadius: 15,
                                alignItems: "center",
                                justifyContent: "center",
                                marginRight: 8,
                                paddingTop: 3,
                            }}
                        >
                            <IconII name="logo-rss" color="#F2EDE9" size={20} />
                        </View>
                        <Text style={[styles.textContainer, { marginTop: 0 }]}>RSS Podcast</Text>
                    </TouchableOpacity>
                ) : (
                    undefined
                )}
            </View>
        </ScrollViewWithHeader>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#F2EDE9",
    },
    logo: {
        marginTop: 10,
        borderRadius: 40,
        height: 80,
        width: 80,
    },
    streamerLogo: {
        borderRadius: 30,
        height: 60,
        width: 60,
    },
    youtubePhoto: {
        width: 300,
        height: 169,
        alignSelf: "center",
    },
    youtubeTitle: {
        textAlign: "center",
        fontSize: 16,
        marginTop: 4,
        fontFamily: "Montserrat-Light",
        color: "#000",
    },
    container: {
        padding: 10,
    },
    title: {
        fontFamily: "Montserrat-Medium",
        color: "#000",
        fontSize: 20,
        textAlign: "center",
        marginTop: 10,
    },
    textContainer: {
        textAlign: "justify",
        fontSize: 16,
        marginTop: 10,
        fontFamily: "Montserrat-Light",
        color: "#000",
    },
})

const mapStateToProps = ({ renegade }) => ({
    renegade,
})
export default connect(mapStateToProps)(ProgramsDetails)

