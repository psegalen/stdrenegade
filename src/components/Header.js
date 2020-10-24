import React from "react"
import {
    SafeAreaView,
    ImageBackground,
    Animated,
    Easing,
    StyleSheet,
    ViewPropTypes,
    TouchableOpacity,
} from "react-native"
import PropTypes from "prop-types"
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons"
import Device from "../tools/Device"

class Header extends React.Component {
    static propTypes = {
        style: ViewPropTypes.style,
        scrollContentYOffset: PropTypes.number,
        shouldShowBackButton: PropTypes.bool,
    }
    static defaultProps = {
        scrollContentYOffset: 0,
        shouldShowBackButton: false,
    }
    // Header animation configuration
    static minHeight = 0
    static maxHeight = 80
    static deltaAnimationProgressThatDoesNotNeedTiming = 0.5
    static computeAnimatedProgressValue = ({ scrollContentYOffset }) =>
        scrollContentYOffset >= 0
            ? Math.max(0, 1 - scrollContentYOffset / (Header.maxHeight - Header.minHeight))
            : 1 + (-scrollContentYOffset * 0.3) / (Header.maxHeight - Header.minHeight) // Bounce
    static animatedHeight = ({ animatedProgress }) =>
        Animated.multiply(animatedProgress, Header.maxHeight - Header.minHeight)
    static animatedOpacity = ({ animatedProgress }) => animatedProgress

    constructor(props) {
        super(props)
        this.animatedProgressValue = Header.computeAnimatedProgressValue({
            scrollContentYOffset: this.props.scrollContentYOffset,
        })
        this.animatedProgress = new Animated.Value(this.animatedProgressValue)
        this.state = {
            statusBarHeight: 20,
        }
    }

    componentDidMount() {
        this.setState({ statusBarHeight: Device.getStatusBarHeight() })
    }

    componentDidUpdate() {
        const { scrollContentYOffset } = this.props
        const newAnimatedProgressValue = Header.computeAnimatedProgressValue({ scrollContentYOffset })
        if (
            Math.abs(this.animatedProgressValue - newAnimatedProgressValue) <=
            Header.deltaAnimationProgressThatDoesNotNeedTiming
        ) {
            this.animatedProgress.setValue(newAnimatedProgressValue)
        } else {
            Animated.timing(this.animatedProgress, {
                toValue: newAnimatedProgressValue,
                duration: 200,
                easing: Easing.out(Easing.quad),
                useNativeDriver: false,
            }).start()
        }
        this.animatedProgressValue = newAnimatedProgressValue
    }

    render() {
        return (
            <ImageBackground
                source={require("../res/images/header-back.jpg")}
                style={[
                    this.props.style
                        ? this.props.style
                        : { ...styles.container, paddingTop: this.state.statusBarHeight },
                ]}
                resizeMode="cover"
            >
                <SafeAreaView style={{ flex: 1 }}>
                    <Animated.Image
                        source={require("../res/images/logo.png")}
                        style={{
                            height: Header.animatedHeight({ animatedProgress: this.animatedProgress }),
                            opacity: Header.animatedOpacity({ animatedProgress: this.animatedProgress }),
                        }}
                        resizeMode="contain"
                    />
                </SafeAreaView>
                {this.props.shouldShowBackButton && this.animatedProgressValue > 0.9 && (
                    <TouchableOpacity
                        onPress={() => (this.props.navigation ? this.props.navigation.goBack() : undefined)}
                        style={{
                            padding: 10,
                            position: "absolute",
                            top: Device.getBackArrowPosition(this.state.statusBarHeight),
                            left: 20,
                        }}
                    >
                        <IconMCI name="arrow-left" size={36} color="#FFF" />
                    </TouchableOpacity>
                )}
            </ImageBackground>
        )
    }
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
