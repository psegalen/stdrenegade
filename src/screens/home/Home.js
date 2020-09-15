import React from "react"
import { SafeAreaView, View } from "react-native"
import Agenda from "../../components/Agenda"
import Header from "../../components/Header"
import Device from "../../tools/Device"

const Home = (props) => (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F2EDE9" }}>
        <View style={{ flex: 1, marginTop: Header.maxHeight + Device.getStatusBarPadding() }}>
            <Agenda navigation={props.navigation} />
        </View>
    </SafeAreaView>
);

export default Home;
