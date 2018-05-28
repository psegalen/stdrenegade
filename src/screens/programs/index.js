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
        navigationOptions: {
            header: <Header />
        }
    }
)