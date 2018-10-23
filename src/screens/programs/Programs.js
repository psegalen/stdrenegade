import React, { Component } from "react"
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native"
import { connect } from "react-redux"

import { Routes } from "."

import ScrollViewWithHeader from "../../components/ScrollViewWithHeader"

class Programs extends Component {
    render() {
        return (
            <ScrollViewWithHeader style={{ flex: 1 }} navigation={this.props.navigation}>
                <View style={{ flex: 1 }}>
                    {this.props.renegade.programs.map((program) => (
                        <View key={program.id} style={styles.container}>
                            <TouchableOpacity
                                style={styles.emission}
                                onPress={() =>
                                    this.props.navigation.navigate(Routes.programsDetails, {
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
        fontFamily: "Montserrat-Light",
        color: "#000",
        fontSize: 18,
        fontWeight: "bold",
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
