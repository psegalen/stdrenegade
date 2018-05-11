import React, { Component } from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';



export default class Header extends Component {
  render() {
    return (
      <View>
        <Image source={require('./images/header-back.jpg')} style={{height:125, width:'100%'}} />
        <Image source={require('./images/logo.png')} style={styles.positionLogo} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  positionLogo: {
    width: 80,
    height: 80,
    position: "absolute",
    top: "25%",
    left: "40%"
  }
});