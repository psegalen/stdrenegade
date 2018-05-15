import React, { Component } from "react";
import { StyleSheet, Text, View, Image, ScrollView, Button} from "react-native";
import { StackNavigator } from "react-navigation"; 

//Component
import Header from './Header';
import DetailsProgram from './DetailsProgram';
import programs from "./data/programs.json";

class Programs extends Component {
  
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View>
        <Header/>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ScrollView>
            {programs.map(program => (
              <View key={program.id} style={styles.container}>
                <View key={program.id} style={styles.emission}>
                  <Image style={styles.logoEmission} source={{ uri: program.logo }} />
                  <View style={styles.containerDetail}>
                    <Text style={styles.programName}>
                      {program.name}
                    </Text>
                    <Button title="Description"
                      onPress={() => this.props.navigation.navigate("Details", {programDetail: program })
                    }
                    />
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}


const RootStack = StackNavigator({
  Emission: {
    screen: Programs
  },
  Details:{
    screen: DetailsProgram
  },
},
{
  initialRouteName: 'Emission'
}
)

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 80,
    backgroundColor: "#DDD",
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
  },
  containerDetail:{
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-around",
      height: 60
  },
  programName:{
      textAlign: "center",
      alignItems: "center",
      padding: 20,
      fontWeight: "500"
  }
});

export default RootStack