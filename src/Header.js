import React, { Component } from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';



export default class Header extends Component {
  render() {
    return (
    
    <View style={{backgroundColor:'#750000'}}>
      <View style={styles.header}>
        <Image source={require('./images/header-back.png')} style={{width: '100%', height:100}} />
        <Image source={require('./images/logo.png')} style={{width: 90, height: 90, position: 'absolute'}} />
      </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: '#FF0000',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }
});