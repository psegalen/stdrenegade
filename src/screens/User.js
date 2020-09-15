import React, { useEffect, useState } from "react"
import { StyleSheet, Text, Button } from "react-native"
import DatePicker from "react-native-date-picker"

import ScrollViewWithHeader from "../components/ScrollViewWithHeader"
import Storage from "../tools/Storage"
import Notification from "../tools/Notification"
import { zeroPad } from "../tools/Date"

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#F2EDE9",
    },
    textContainer: {
        textAlign: "justify",
        fontSize: 16,
        marginTop: 10,
        fontFamily: "Montserrat-Light",
        color: "#000",
    },
})

const User = () => {
    const [ date, setDate ] = useState(new Date())
    const [ storedDate, setStoredDate ] = useState(undefined)

    useEffect(() => {
        Storage.getResubDate().then((storageDate) => {
            if (storageDate) {
                setDate(storageDate)
                setStoredDate(storageDate)
            }
        })
    }, [])

    const handleResubDate = () => {
        Notification.renewNotification(date)
        setStoredDate(date)
    }

    return (
        <ScrollViewWithHeader style={styles.root} padding={16}>
            <Text style={styles.textContainer}>Fin de mon abonnement Prime à la chaîne :</Text>
            <Text style={{ ...styles.textContainer, fontSize: 20 }}>
                {storedDate
                    ? `Le ${storedDate.toLocaleDateString()} à ${storedDate.getHours()}h${zeroPad(
                          storedDate.getMinutes()
                      )}`
                    : "A définir"}
            </Text>
            <DatePicker
                date={date}
                onDateChange={(pickerDate) => setDate(pickerDate)}
                locale="fr"
                style={{ marginTop: 10, alignSelf: "center" }}
                minuteInterval={5}
                fadeToColor="#F2EDE9"
                textColor="#000000"
            />
            <Button onPress={handleResubDate} title="Définir un rappel" />
        </ScrollViewWithHeader>
    )
}

export default User
