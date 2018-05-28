import React from "react"
import { StatusBar } from "react-native"

import RootNavigator from "./screens"

export default class App extends React.Component {
    componentDidMount() {
        StatusBar.setBarStyle("light-content")
    }

    render() {
        return <RootNavigator />
    }
}