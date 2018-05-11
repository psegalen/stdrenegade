import React, { Component } from 'react';
import {View, Text, StyleSheet } from 'react-native';

export default class Agenda extends Component {

    currentDate = () => {
        let date = new Date().getDay();
        let month = new Date().getMonth() + 1;
        let years = new Date().getFullYear();
        return dateCurrent = `${date}-${month}-${years}`
    }

  render() {
    return (
            <View style={{justifyContent: "center", alignItems: "center"}} >
                <Text style={styles.title}>Agenda</Text>
                <Text>{this.currentDate()}</Text>
            </View>
    )
  }
}

const styles = StyleSheet.create({
    title:{
        fontFamily: "Montserrat-Light",
        fontSize: 18
    }
})
