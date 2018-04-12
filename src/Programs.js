import React, { Component } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";

//Component
import Header from './Header';

// Les programmes de studio Renegade
import programs from "./data/programs.json";

export default class Programs extends Component {
  render() {
    return (
        <View>
        <Header />
        <ScrollView>
        {programs.map(program => (
          <View key={program.id} style={styles.container}>
          <View key={program.id} style={styles.emission}>
              <Image 
                style={styles.logoEmission}
                source={{ uri: program.logo }}
              />
              <Text style={{textAlign: 'center', alignItems:'center', padding:20,fontWeight: '500'}}>{program.name}</Text>
            </View>
          </View>
          ))}
        </ScrollView>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 80,
    backgroundColor: "#F2EDE9",
    borderRadius: 80,
    margin: 20
  },
  emission: {
    flex: 1,
    flexDirection: "row",
    width: 250,
    height: 80
  },
 logoEmission: {
      borderRadius: 40,
      height: 80,
      width: 80
    }
});