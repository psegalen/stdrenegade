import React, { Component } from "react"
import { SafeAreaView, View } from "react-native"
import Agenda from "../../components/Agenda"
import Header from "../../components/Header"

export default class Home extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#F2EDE9" }}>
                <View style={{ flex: 1, marginTop: Header.maxHeight }}>
                    <Agenda navigation={this.props.navigation} />
                </View>
            </SafeAreaView>
        )
    }
}
