import React, { Component } from 'react';
import {View, Text, StyleSheet } from 'react-native';

export default class Agenda extends Component {

    currentDate = () => {
        const now = new Date();
        const day = now.getDay();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();

        return `${day}-${month}-${year}`;
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
