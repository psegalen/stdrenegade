import React, { Component } from "react"
import { View } from "react-native"
import Agenda from "../../components/Agenda"
import ScrollViewWithHeader from "../../components/ScrollViewWithHeader"

export default class Home extends Component {
    render() {
        return (
            <ScrollViewWithHeader style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Agenda />
                </View>
            </ScrollViewWithHeader>
        )
    }
}
