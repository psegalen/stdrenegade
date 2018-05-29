import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  TouchableHighlight
} from "react-native";
// React-Native-Elements

// React-Navigation
import { TabNavigator } from "react-navigation";
// Component
import Header from "../../components/Header";
import Agenda from "../../components/Agenda";

export default class Home extends Component {
  openTwitch() {
    const twitchWeb = "https://twitch.tv/studiorenegade";
    const twitchApp = "twitch://stream/studiorenegade";
    Linking.canOpenURL(twitchApp).then(canOpen => {
      if (canOpen) {
        Linking.openURL(twitchApp);
      } else {
        Linking.openURL(twitchWeb);
      }
    });
  }
  render() {
    return (
      <View>
        <Header />
        <View style={styles.containerLive}>
          <Text style={styles.live}>Actuellement en live !</Text>
          <Text style={styles.emissionLive}>NELIGER!!!!!</Text>
          <TouchableHighlight
            style={styles.twitchLogo}
            onPress={this.openTwitch}
          >
            <Image
              source={require("../../res/images/twitch.png")}
              style={{ height: 55, width: 55 }}
            />
          </TouchableHighlight>
        </View>
        <View>
          <Text>Prochainement</Text>
          <Agenda />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerLive: {
    backgroundColor: "#000",
    height: 60,
    position: "relative"
  },
  live: {
    fontSize: 18,
    color: "#FFF",
    fontFamily: "Montserrat-Light"
  },
  emissionLive: {
    fontSize: 25,
    color: "#FFF",
    fontFamily: "Montserrat-Medium"
  },
  twitchLogo: {
    position: "absolute",
    left: "70%",
    top: "5%"
  }
});
