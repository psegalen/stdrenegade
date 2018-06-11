import React from "react"
import {
    SafeAreaView,
    ImageBackground,
    Animated,
    Dimensions,
    StyleSheet,
    ViewPropTypes,
    TouchableOpacity,
    Text,
} from "react-native"
import PropTypes from "prop-types"

const windowSize = Dimensions.get("window")

const Header = (props) => (
    <ImageBackground
        source={require("../res/images/header-back.jpg")}
        style={[props.styles, styles.container]}
        resizeMode="cover"
    >
        <SafeAreaView style={{ flex: 1 }}>
            <Animated.Image
                source={require("../res/images/logo.png")}
                style={{ height: props.height }}
                resizeMode="contain"
            />
        </SafeAreaView>
    </ImageBackground>
)
Header.minHeight = 0
Header.maxHeight = 80
Header.animatedHeight = ({ scrollContentYOffset }) =>
    scrollContentYOffset.interpolate({
        inputRange: [-windowSize.height, 0, Header.maxHeight - Header.minHeight],
        outputRange: [Header.maxHeight + windowSize.height * 0.3, Header.maxHeight, Header.minHeight],
        useNativeDriver: true,
    })

Header.propTypes = {
    style: ViewPropTypes.style,
    height: PropTypes.object,
}
Header.defaultProps = {
    height: Header.maxHeight,
}

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
