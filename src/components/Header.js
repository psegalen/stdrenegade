import React from "react"
import { SafeAreaView, ImageBackground, Animated, Dimensions, StyleSheet } from "react-native"

const Header = (props) => (
    <ImageBackground
        source={require("../res/images/header-back.jpg")}
        style={[props.styles, styles.container]}
        resizeMode="cover"
    >
        <SafeAreaView>
            <Animated.Image
                source={require("../res/images/logo.png")}
                style={{ height: props.height || Header.maxHeight }}
                resizeMode="contain"
            />
        </SafeAreaView>
    </ImageBackground>
)

const windowSize = Dimensions.get("window")

Header.minHeight = 0
Header.maxHeight = 80
Header.animatedHeight = ({ deltaY }) =>
    deltaY.interpolate({
        inputRange: [-windowSize.height, 0, Header.maxHeight - Header.minHeight],
        outputRange: [Header.maxHeight + windowSize.height * 0.3, Header.maxHeight, Header.minHeight],
        useNativeDriver: true,
    })

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        alignItems: "center",
        justifyContent: "center",
    },
})

export default Header
