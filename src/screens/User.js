import React, { Component } from "react"
import { Text } from "react-native"
import DatePicker from "react-native-date-picker"

import ScrollViewWithHeader from "../components/ScrollViewWithHeader"

class User extends Component {
    state = { date: new Date() }
    render() {
        return (
            <ScrollViewWithHeader
                style={{
                    flex: 1,
                    backgroundColor: "#F2EDE9",
                }}
            >
                <Text>User</Text>
                <Text>{`${this.state.date}`}</Text>
                <DatePicker date={this.state.date} onDateChange={(date) => this.setState({ date })} locale="fr" />
            </ScrollViewWithHeader>
        )
    }
}

export default User
