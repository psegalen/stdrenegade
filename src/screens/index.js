import React from "react"
import { createBottomTabNavigator } from "react-navigation-tabs"
import IconII from "react-native-vector-icons/Ionicons"
import IconFA from "react-native-vector-icons/FontAwesome"

import HomeNavigator, { HomeRoutes } from "./home"
import ProgramsNavigator, { ProgramRoutes } from "./programs"

import Colors from "../res/colors"
import User from "./User"
import { createAppContainer } from "react-navigation"

export const Routes = {
    home: "HOME",
    programs: "PROGRAMS",
    user: "USER",
}

HomeNavigator.navigationOptions = {
    tabBarIcon: ({ tintColor }) => <IconII name="ios-home" color={tintColor} size={26} />,
    tabBarLabel: "Accueil",
    tabBarOnPress: (tab) => {
        tab.navigation.navigate({ routeName: HomeRoutes.homeHome })
    },
}

ProgramsNavigator.navigationOptions = {
    tabBarIcon: ({ tintColor }) => <IconFA name="tv" color={tintColor} size={24} />,
    tabBarLabel: "Émissions",
    tabBarOnPress: (tab) => {
        tab.navigation.navigate({ routeName: ProgramRoutes.programsHome })
    },
}

User.navigationOptions = {
    tabBarIcon: ({ tintColor }) => <IconFA name="user" color={tintColor} size={26} />,
    tabBarLabel: "Mon compte",
}

const bottom = createBottomTabNavigator(
    {
        [Routes.home]: HomeNavigator,
        [Routes.programs]: ProgramsNavigator,
        [Routes.user]: User,
    },
    {
        tabBarOptions: {
            activeTintColor: Colors.darkRed,
            inactiveTintColor: "gray",
        },
    }
)

export default createAppContainer(bottom)
