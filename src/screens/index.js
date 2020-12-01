import React from "react"
import { createBottomTabNavigator } from "react-navigation-tabs"
import IconII from "react-native-vector-icons/Ionicons"
import IconFA from "react-native-vector-icons/FontAwesome"

import HomeNavigator from "./home"
import ProgramsNavigator from "./programs"
import StreamersNavigator from "./streamers"
import {HomeRoutes, StreamerRoutes, ProgramRoutes} from "./routes"



import Colors from "../res/colors"
import User from "./User"
import { createAppContainer } from "react-navigation"

export const Routes = {
    home: "HOME",
    programs: "PROGRAMS",
    streamers: "STREAMERS",
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
StreamersNavigator.navigationOptions = {
    tabBarIcon: ({ tintColor }) => <IconFA name="users" color={tintColor} size={20} />,
    tabBarLabel: "Streamers",
    tabBarOnPress: (tab) => {
        tab.navigation.navigate({ routeName: StreamerRoutes.streamersHome })
    },
}
User.navigationOptions = {
    tabBarIcon: ({ tintColor }) => <IconFA name="cog" color={tintColor} size={26} />,
    tabBarLabel: "Paramètres",
}

const bottom = createBottomTabNavigator(
    {
        [Routes.home]: HomeNavigator,
        [Routes.programs]: ProgramsNavigator,
        [Routes.streamers]: StreamersNavigator,
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
