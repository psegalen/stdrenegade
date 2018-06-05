import React, { Component } from "react"
import {
    View,
    Text,
    StyleSheet,
    Image,
    Linking,
    TouchableOpacity,
    ScrollView,
    Animated,
    SafeAreaView,
    Alert,
} from "react-native"
import DeviceInfo from "react-native-device-info"

// Component
import Header from "../../components/Header"
import Device from "../../tools/Device"

const HEADER_MAX_HEIGHT = 125
const HEADER_MIN_HEIGHT = Device.getStatusBarHeight()
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

export default class SupportUs extends Component {
    constructor(props) {
        super(props)

        this.state = {
            scrollY: new Animated.Value(0),
        }
    }
    render() {
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: "clamp",
        })
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={styles.scrollViewContent}
                    scrollEventThrottle={16}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])}
                >
                    <View style={{ flex: 1 }}>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontFamily: "Montserrat-Medium", marginTop: 10, fontSize: 25 }}>
                                MERCI À VOUS !
                            </Text>
                            <View style={{ width: "95%", marginTop: 10 }}>
                                <Text style={styles.containerText}>
                                    Aujourd'hui nous pouvons produire notre contenu grâce à vos financements ! Que vous
                                    souhaitiez nous soutenir régulièrement sur Tipeee (à partir de 1€ par mois),
                                    ponctuellement via des dons PayPal ou en profitant de votre abonnement Amazon
                                    Premium via Twitch Prime, MERCI.
                                </Text>

                                <Text style={styles.containerText}>
                                    Aujourd'hui nous poursuivons notre but : vous proposer toujours plus de contenu tout
                                    en améliorant la qualité de ces derniers. Nous sommes nous mêmes donateurs de
                                    l'association de loi 1901. Merci encore à vous !
                                </Text>
                                <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                                    <Image
                                        source={require("../../res/images/signature.png")}
                                        style={{ width: 250, height: 100 }}
                                    />
                                </View>
                            </View>
                        </View>

                        <View
                            style={{
                                flexDirection: "column",
                                justifyContent: "space-around",
                                alignItems: "center",
                                marginTop: 70,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => Linking.openURL("https://www.twitch.tv/subs/studiorenegade")}
                                style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}
                            >
                                <Image
                                    source={require("../../res/images/twitch.png")}
                                    style={{ height: 70, width: 70 }}
                                />
                                <Text style={styles.containerText}>S'abonner</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => Linking.openURL("https://www.tipeee.com/stdrenegade")}>
                                <Image
                                    source={require("../../res/images/Tipeee_logo.png")}
                                    style={{ height: 50, width: 135 }}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() =>
                                    Linking.openURL(
                                        "https://www.paypal.com/cgi-bin/webscr/?cmd=_s-xclick&hosted_button_id=QZXLDBZV3UEWS"
                                    )
                                }
                            >
                                <Image
                                    source={require("../../res/images/paypal.png")}
                                    style={{ height: 50, width: 120 }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ height: 100 }} />
                </ScrollView>
                <Animated.View style={[styles.header, { height: headerHeight }]}>
                    <Header />
                </Animated.View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    containerText: {
        textAlign: "justify",
        fontFamily: "Montserrat-Light",
        fontSize: 15,
        fontWeight: "400",
        lineHeight: 20,
    },
    header: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#4A0B0F",
        overflow: "hidden",
    },
    bar: {
        marginTop: 28,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        backgroundColor: "transparent",
        color: "white",
        fontSize: 18,
    },
    scrollViewContent: {
        marginTop: HEADER_MAX_HEIGHT,
        paddingBottom: HEADER_MAX_HEIGHT,
    },
})
