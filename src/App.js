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
import { Icon } from "react-native-elements";
// React-Navigation
import { TabNavigator } from "react-navigation";
// Component
import Header from "./Header";
import Programs from "./Programs";
import Agenda from "./Agenda";
import Support from "./Support";

class Accueil extends Component {
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
              source={require("./images/twitch.png")}
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

export default TabNavigator({
  Accueil: {
    screen: Accueil,
    navigationOptions: {
      tabBarLabel: "Accueil",
      tabBarIcon: <Icon name="ios-home" type="ionicon" />
    }
  },
  Emissions: {
    screen: Programs,
    navigationOptions: {
      tabBarLabel: "Émissions",
      tabBarIcon: <Icon name="tv" />
    }
  },
  Support: {
    screen: Support,
    navigationOptions: {
      tabBarLabel: "Nous Soutenir",
      tabBarIcon: <Icon name="ios-card" type="ionicon" />
    }
  }
});
