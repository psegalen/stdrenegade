import React, { Component } from 'react';
import { StyleSheet, Text, View, Image} from "react-native";


export default class ProgramsDetails extends Component {
    static navigationOptions = {
    title: "Détail Émission"
  };

  render() {
      const { params } = this.props.navigation.state;
      const programDescription = params.programDetail.description;
      const logoEmission = params.programDetail.logo;

    return (
      <View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image source={{ uri: logoEmission }} style={styles.logo} />
        </View>
        <Text style={styles.textContainer}>{programDescription}</Text>
        <Text style={{ fontWeight: "900" }}>Streameurs</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-around", margin:10 }}>
          <Image style={{ height: 150, width: 150, borderRadius: 75 }} source={{ uri: "https://picsum.photos/200/?random" }} />
        </View>
        <Text>Prochain stream : ???</Text>
        <Text>Dernière émission : ??? </Text>
      </View>
    )};
}

const styles = StyleSheet.create({
  logo: {
    marginTop: 10,
    borderRadius: 40,
    height: 80,
    width: 80
  },
  textContainer: {
    padding: 10,
    textAlign: "justify"
  },
  streameur: {
    height: 70,
    width: 70,
    borderRadius: 35
  }
});