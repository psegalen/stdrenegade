import React, { Component } from "react"
import { View } from "react-native"
import Agenda from "../../components/Agenda"
import ScrollViewWithHeader from "../../components/ScrollViewWithHeader"

export default class Home extends Component {
    render() {
        return (
            <ScrollViewWithHeader style={{ flex: 1, backgroundColor: "#F2EDE9" }}>
                <View style={{ flex: 1 }}>
                    <Agenda navigation={this.props.navigation} />
                </View>
            </ScrollViewWithHeader>
        )
    }
}
