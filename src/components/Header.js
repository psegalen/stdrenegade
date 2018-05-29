import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';

const Header = () => {
    return (
      <View>
        <Image source={require('../res/images/header-back.jpg')} style={{height:125, width:'100%'}} />
        <Image source={require('../res/images/logo.png')} style={styles.positionLogo} />
      </View>
    )
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

export default Header
