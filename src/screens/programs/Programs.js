import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Button
} from "react-native";
import { StackNavigator } from "react-navigation";

//Component
import Header from "../../components/Header";
import programs from "../../res/data/programs.json";

export default class Programs extends Component {
  render() {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ScrollView style={{ width: "100%" }}>
          <View style={{ flex: 1 }}>
            {programs.map(program => (
              <View key={program.id} style={styles.container}>
                <View key={program.id} style={styles.emission}>
                  <Image
                    style={styles.logoEmission}
                    source={{ uri: program.logo }}
                  />
                  <View style={styles.containerDetail}>
                    <Text style={styles.programName}>{program.name}</Text>
                    <Button
                      title="Description"
                      onPress={() =>
                        this.props.navigation.navigate("Details", {
                          programDetail: program
                        })
                      }
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DDD",
    borderRadius: 80,
    marginHorizontal: 20,
    marginVertical: 10
  },
  emission: {
    flex: 1,
    flexDirection: "row",
    height: 80
  },
  logoEmission: {
    borderRadius: 40,
    height: 80,
    width: 80
  },
  containerDetail: {
    flexDirection: "column",
    justifyContent: "space-around",
    flex: 1,
    height: 60
  },
  programName: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
    padding: 20,
    fontWeight: "500"
  }
});
