
import React, { Component } from "react";
import { View, Text, StyleSheet} from "react-native";
// React-Navigation
import { TabNavigator } from 'react-navigation';
// Component 
import Programs from './Programs';
import Header from './Header';


class HomeScreen extends Component {
  render() {
    return (
      <View>
        <Header />
        <Text style={style.work}>Work in progress</Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  work:{
    fontSize: 28
  }
})


export default TabNavigator({
  Accueil: { screen: HomeScreen },
  Émissions: { screen: Programs }
});