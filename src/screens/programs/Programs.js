import React, { Component } from "react"
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native"
import { connect } from "react-redux"

import { ProgramRoutes } from "."

import ScrollViewWithHeader from "../../components/ScrollViewWithHeader"

class Programs extends Component {
    render() {
        return (
            <ScrollViewWithHeader style={styles.root} navigation={this.props.navigation}>
                <View style={styles.root}>
                    {this.props.renegade.programs.map((program) => (
                        <View key={program.id} style={styles.container}>
                            <TouchableOpacity
                                style={styles.emission}
                                onPress={() =>
                                    this.props.navigation.navigate(ProgramRoutes.programsDetails, {
                                        programDetail: program,
                                    })
                                }
                            >
                                <Image style={styles.logoEmission} source={{ uri: program.logo }} />
                                <View style={styles.containerDetail}>
                                    <Text style={styles.programName}>{program.name}</Text>
                                    {program.nextLive.length > 0 && (
                                        <Text style={styles.programTime}>{program.nextLive}</Text>
                                    )}
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollViewWithHeader>
        )
    }
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
    emission: {
        flex: 1,
        flexDirection: "row",
        height: 80,
    },
    logoEmission: {
        borderRadius: 40,
        height: 80,
        width: 80,
    },
    containerDetail: {
        flexDirection: "column",
        justifyContent: "center",
        flex: 1,
        paddingLeft: 10,
    },
    programName: {
        fontFamily: "Montserrat-Medium",
        color: "#000",
        fontSize: 18,
    },
    programTime: {
        fontFamily: "Montserrat-Light",
        color: "#000",
        paddingTop: 4,
    },
})

const mapStateToProps = ({ renegade }) => ({
    renegade,
})

export default connect(mapStateToProps)(Programs)
