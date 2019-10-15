import React from "react"
import { createStackNavigator } from "react-navigation-stack"

import Home from "./Home"
import ProgramsDetails from "../programs/ProgramsDetails"

import Header from "../../components/Header"

export const HomeRoutes = {
    homeHome: "HOME_HOME",
    homeDetails: "HOME_DETAILS",
}

export default createStackNavigator(
    {
        [HomeRoutes.homeHome]: Home,
        [HomeRoutes.homeDetails]: ProgramsDetails,
    },
    {
        defaultNavigationOptions: ({ navigation }) => {
            const { params = {} } = navigation.state
            const { scrollContentYOffset } = params
            return {
                header: ({ index }) => (
                    <Header
                        navigation={navigation}
                        scrollContentYOffset={scrollContentYOffset}
                        shouldShowBackButton={index !== 0}
                        params={params}
                    />
                ),
            }
        },
    }
)
