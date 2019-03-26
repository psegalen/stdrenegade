import React from "react"
import { createBottomTabNavigator } from "react-navigation"
import IconII from "react-native-vector-icons/Ionicons"
import IconFA from "react-native-vector-icons/FontAwesome"

import HomeNavigator, { HomeRoutes } from "./home"
import ProgramsNavigator, { ProgramRoutes } from "./programs"
import SupportUs from "./support-us/SupportUs"

import Colors from "../res/colors"

export const Routes = {
    home: "HOME",
    programs: "PROGRAMS",
    supportUs: "SUPPORT_US",
}

export default createBottomTabNavigator(
    {
        [Routes.home]: HomeNavigator,
        [Routes.programs]: ProgramsNavigator,
        [Routes.supportUs]: SupportUs,
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
                        case Routes.supportUs:
                            return <IconII name="ios-card" color={tintColor} size={26} />
                    }
                },
                tabBarLabel: (() => {
                    switch (routeName) {
                        case Routes.home:
                            return "Accueil"
                        case Routes.programs:
                            return "Émissions"
                        case Routes.supportUs:
                            return "Nous Soutenir"
                    }
                })(),
                tabBarOnPress: (tab) => {
                    const { routeName } = tab.navigation.state
                    console.log(tab)
                    console.log(tab.navigation.getScreenProps())
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
