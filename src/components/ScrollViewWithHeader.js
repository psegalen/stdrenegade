import React, { Component } from "react"
import { SafeAreaView, StyleSheet, ViewPropTypes, ScrollView, View } from "react-native"
import PropTypes from "prop-types"

import Header from "./Header"

export default class ScrollViewWithHeader extends Component {
    static propTypes = {
        style: ViewPropTypes.style,
        children: PropTypes.node,
        navigation: PropTypes.object, // Provide navigation object if header is in navigation stack
        padding: PropTypes.number,
    }

    state = {
        offsetY: 0,
        isScrollEnabled: true,
        scrollViewHeight: 0,
    }

    onScroll = ({ nativeEvent }) =>
        this.props.navigation
            ? this.props.navigation.setParams({ scrollContentYOffset: nativeEvent.contentOffset.y })
            : this.setState({ offsetY: nativeEvent.contentOffset.y })

    onScrollViewLayout = (evt) => {
        this.setState({ scrollViewHeight: evt.nativeEvent.layout.height })
    }

    onRootViewLayout = (evt) => {
        // this.setState({ isScrollEnabled: evt.nativeEvent.layout.height > this.state.scrollViewHeight })
    }

    render() {
        return (
            <SafeAreaView style={this.props.style}>
                <ScrollView
                    style={{ flex: 1 }}
                    scrollEventThrottle={16}
                    onScroll={this.onScroll}
                    onLayout={this.onScrollViewLayout}
                    scrollEnabled={this.state.isScrollEnabled}
                >
                    <View
                        style={{ flex: 1, marginTop: Header.maxHeight, padding: this.props.padding || 0 }}
                        onLayout={this.onRootViewLayout}
                    >
                        {this.props.children}
                    </View>
                </ScrollView>
                {!this.props.navigation && <Header scrollContentYOffset={this.state.offsetY} />}
            </SafeAreaView>
        )
    }
}
