import React from "react"
import { createStackNavigator } from "react-navigation"

import Programs from "./Programs"
import ProgramsDetails from "./ProgramsDetails"

import Header from "../../components/Header"

export const Routes = {
    programsHome: "PROGRAMS_HOME",
    programsDetails: "PROGRAMS_DETAILS",
}

export default createStackNavigator(
    {
        [Routes.programsHome]: Programs,
        [Routes.programsDetails]: ProgramsDetails,
    },
    {
        navigationOptions: ({ navigation }) => {
            const { params = {} } = navigation.state
            const { scrollContentYOffset } = params
            return {
                header: ({ index }) => (
                    <Header
                        navigation={navigation}
                        scrollContentYOffset={scrollContentYOffset}
                        shouldShowBackButton={index !== 0}
                    />
                ),
            }
        },
    }
)
