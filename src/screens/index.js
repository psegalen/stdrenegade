import React from "react"
import { Linking } from "react-native"
import { createBottomTabNavigator } from "react-navigation"
import IconII from "react-native-vector-icons/Ionicons"
import IconFA from "react-native-vector-icons/FontAwesome"

import HomeNavigator, { HomeRoutes } from "./home"
import ProgramsNavigator, { ProgramRoutes } from "./programs"

import Colors from "../res/colors"
import User from "./User"

export const Routes = {
    home: "HOME",
    programs: "PROGRAMS",
    user: "USER",
}

export default createBottomTabNavigator(
    {
        [Routes.home]: HomeNavigator,
        [Routes.programs]: ProgramsNavigator,
        [Routes.user]: User,
    },
    {
        navigationOptions: ({ navigation }) => {
            const { routeName } = navigation.state
            return {
                tabBarIcon: ({ tintColor }) => {
                    switch (routeName) {
                        case Routes.home:
                            return <IconII name="ios-home" color={tintColor} size={26} />
                        case Routes.programs:
                            return <IconFA name="tv" color={tintColor} size={24} />
                        case Routes.user:
                            return <IconFA name="user" color={tintColor} size={26} />
                    }
                },
                tabBarLabel: (() => {
                    switch (routeName) {
                        case Routes.home:
                            return "Accueil"
                        case Routes.programs:
                            return "Émissions"
                        case Routes.user:
                            return "Mon compte"
                    }
                })(),
                tabBarOnPress: (tab) => {
                    const { routeName } = tab.navigation.state
                    switch (routeName) {
                        case Routes.programs:
                            tab.navigation.navigate({ routeName: ProgramRoutes.programsHome })
                            break
                        case Routes.home:
                            tab.navigation.navigate({ routeName: HomeRoutes.homeHome })
                            break
                        default:
                            tab.defaultHandler()
                            break
                    }
                },
            }
        },
        tabBarOptions: {
            activeTintColor: Colors.darkRed,
            inactiveTintColor: "gray",
        },
    }
)
