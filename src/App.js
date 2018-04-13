
import React, { Component } from "react";
import { View, Text, StyleSheet} from "react-native";
// React-Navigation
import { TabNavigator } from 'react-navigation';
// React-Native-Elements
import { Icon } from 'react-native-elements';
// Component 
import Programs from './Programs';
import Header from './Header';


class Accueil extends Component {
  render() {
    return <View>
        <Header />
        <Text style={style.work}>Work in progress</Text>
        
      </View>;
  }
}

const style = StyleSheet.create({
  work:{
    fontSize: 28
  }
})


export default TabNavigator({
  Accueil: {
    screen: Accueil,
    navigationOptions: {
      tabBarLabel: "Accueil",
      tabBarIcon: <Icon name="ios-home" type="ionicon" />
    }
  },
  Émissions: {
    screen: Programs,
    navigationOptions: {
      tabBarLabel: "Émissions",
      tabBarIcon: <Icon name="tv"  />
    }
  }
});