import React from "react"
import {ProgramRoutes, StreamerRoutes} from "../routes"
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native"
import { connect } from "react-redux"

import ScrollViewWithHeader from "../../components/ScrollViewWithHeader"


const Streamers = (props) => {
    return (
        <ScrollViewWithHeader style={styles.root} navigation={props.navigation}>
            {props.renegade.streamers.map((streamer) => (
                <TouchableOpacity 
                key={streamer.id} 
                onPress={()=>props.navigation.navigate(StreamerRoutes.streamersDetails,{
                streamerDetail:streamer,
                })} >
                <View style={styles.container}>
                    <View style={styles.streamer}>
                            <Image style={styles.photoStreamer} source={{ uri: streamer.logo }} />
                        <View style={styles.containerDetail}>
                            <Text style={styles.StreamerName}>{streamer.name}</Text>
                            <View style={styles.containerProgramsLogo}>
                                {streamer.programDetails.map((program) => (
                                    <TouchableOpacity
                                    key={program.id}
                                        onPress={() =>
                                            props.navigation.navigate(ProgramRoutes.programsDetails, {
                                                programId : program.id
                                            })
                                        }
                                    >
                                        <Image
                                            key={program.id}
                                            style={styles.programsLogo}
                                            source={{ uri: program.logo }}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>
                </View>
                </TouchableOpacity>
            ))}
        </ScrollViewWithHeader>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#F2EDE9",
    },
    container: {
        backgroundColor: "#DDD",
        borderRadius: 80,
        marginHorizontal: 20,
        marginVertical: 10,
    },
    streamer: {
        flex: 1,
        flexDirection: "row",
        height: 80,
    },
    photoStreamer: {
        borderRadius: 40,
        height: 80,
        width: 80,
    },
    StreamerName: {
        fontFamily: "Montserrat-Medium",
        color: "#000",
        fontSize: 18,
    },
    containerProgramsLogo: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    },
    programsLogo: {
        borderRadius: 80,
        width: 40,
        height: 40,
        margin: 5,
    },
    containerDetail: {
        flexDirection: "column",
        justifyContent: "center",
        flex: 1,
        paddingLeft: 10,
    },
})
const mapStateToProps = ({ renegade }) => ({
    renegade,
})
export default connect(mapStateToProps)(Streamers)
