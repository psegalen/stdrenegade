import React, { Component } from "react"
import { SafeAreaView, StyleSheet, ViewPropTypes, ScrollView, View } from "react-native"
import PropTypes from "prop-types"

import Header from "./Header"

export default class ScrollViewWithHeader extends Component {
    static propTypes = {
        style: ViewPropTypes.style,
        children: PropTypes.node,
        navigation: PropTypes.object, // Provide navigation object if header is in navigation stack
    }

    state = {
        offsetY: 0,
    }

    onScroll = ({ nativeEvent }) =>
        this.props.navigation
            ? this.props.navigation.setParams({ scrollContentYOffset: nativeEvent.contentOffset.y })
            : this.setState({ offsetY: nativeEvent.contentOffset.y })

    render() {
        return (
            <SafeAreaView style={this.props.style}>
                <ScrollView style={{ flex: 1 }} scrollEventThrottle={16} onScroll={this.onScroll}>
                    <View style={{ flex: 1, marginTop: Header.maxHeight }}>{this.props.children}</View>
                </ScrollView>
                {!this.props.navigation && <Header style={styles.header} scrollContentYOffset={this.state.offsetY} />}
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
    },
})
