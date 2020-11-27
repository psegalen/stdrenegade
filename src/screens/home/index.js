import React from "react"
import { createStackNavigator } from "react-navigation-stack"

import Home from "./Home"
import ProgramsDetails from "../programs/ProgramsDetails"
import StreamersDetails from "../streamers/StreamersDetails"
import {HomeRoutes, StreamerRoutes} from "../routes"


import Header from "../../components/Header"



export default createStackNavigator(
    {
        [HomeRoutes.homeHome]: Home,
        [HomeRoutes.homeDetails]: ProgramsDetails,
        [StreamerRoutes.streamersDetails]: StreamersDetails
    },
    {
        defaultNavigationOptions: ({ navigation }) => {
            const { params = {} } = navigation.state
            const { scrollContentYOffset } = params
            return {
                header: ({ scene }) => (
                    <Header
                        navigation={navigation}
                        scrollContentYOffset={scrollContentYOffset}
                        shouldShowBackButton={scene.route.routeName !== HomeRoutes.homeHome}
                        params={params}
                    />
                ),
            }
        },
    }
)
