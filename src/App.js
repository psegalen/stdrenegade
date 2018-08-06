import React from "react"
import { StatusBar } from "react-native"
import { Provider } from "react-redux"

import RootNavigator from "./screens"
import store from "./data/store"

export default class App extends React.Component {
    componentDidMount() {
        StatusBar.setBarStyle("light-content")
    }

    render() {
        return (
            <Provider store={store}>
                <RootNavigator />
            </Provider>
        )
    }
}
