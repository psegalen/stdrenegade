import React, { Component } from "react"
import { SafeAreaView, StyleSheet, ViewPropTypes, ScrollView, Animated } from "react-native"
import PropTypes from "prop-types"

import Header from "./Header"

export default class ScrollViewWithHeader extends Component {
    static propTypes = {
        style: ViewPropTypes.style,
        children: PropTypes.node,
        navigation: PropTypes.object, // Provide navigation object if header is in navigation stack
    }

    constructor(props) {
        super(props)
        this.state = {
            offsetY: new Animated.Value(0),
        }
        this._headerHeight = Header.animatedHeight({ scrollContentYOffset: this.state.offsetY })
        props.navigation && props.navigation.setParams({ headerHeight: this._headerHeight })
    }

    _onScroll = ({ nativeEvent }) => this.state.offsetY.setValue(nativeEvent.contentOffset.y)

    render() {
        return (
            <SafeAreaView style={this.props.style}>
                <ScrollView style={{ flex: 1 }} scrollEventThrottle={16} onScroll={this._onScroll}>
                    <Animated.View style={{ flex: 1, paddingTop: this._headerHeight }}>
                        {this.props.children}
                    </Animated.View>
                </ScrollView>
                {!this.props.navigation && <Header style={styles.header} height={this._headerHeight} />}
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
