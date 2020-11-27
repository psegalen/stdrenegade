import React from "react"
import { createStackNavigator } from "react-navigation-stack"

import Streamers from "./Streamers"
import StreamersDetails from "./StreamersDetails"
import ProgramsDetails from "../programs/ProgramsDetails"
import {ProgramRoutes, StreamerRoutes} from "../routes"
import Header from "../../components/Header"

export default createStackNavigator(
    {
        [StreamerRoutes.streamersHome]: Streamers,
        [StreamerRoutes.streamersDetails]: StreamersDetails,
        [ProgramRoutes.programsDetails] : ProgramsDetails, 
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
                        shouldShowBackButton={scene.route.routeName !== StreamerRoutes.streamersHome}
                        params={params}
                    />
                ),
            }
        },
    }
)
