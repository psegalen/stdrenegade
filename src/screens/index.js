import React from "react"
import { createBottomTabNavigator } from "react-navigation"
import { Icon } from "react-native-elements";

import Home from "./home/Home"
import ProgramsNavigator from "./programs"
import SupportUs from "./support-us/SupportUs"

import Colors from "../res/colors"

export const Routes = {
    home: "HOME",
    programs: "PROGRAMS",
    supportUs: "SUPPORT_US",
}

export default createBottomTabNavigator(
    {
        [Routes.home]: Home,
        [Routes.programs]: ProgramsNavigator,
        [Routes.supportUs]: SupportUs,
    },
    {
        navigationOptions: ({ navigation }) => {
            const { routeName } = navigation.state
            return {
                tabBarIcon: ({ focused, tintColor }) => {
                    switch (routeName) {
                        case Routes.home: return <Icon name="ios-home" type="ionicon" color={tintColor} />
                        case Routes.programs: return <Icon name="tv" color={tintColor} />
                        case Routes.supportUs: return <Icon name="ios-card" type="ionicon" color={tintColor} />
                    }
                },
                tabBarLabel: (() => {
                    switch (routeName) {
                        case Routes.home: return "Accueil"
                        case Routes.programs: return "Émissions"
                        case Routes.supportUs: return "Nous Soutenir"
                    }
                })()
            }
        },
        tabBarOptions: {
            activeTintColor: Colors.darkRed,
            inactiveTintColor: 'gray',
        },
    }
)