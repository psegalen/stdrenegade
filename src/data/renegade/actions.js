export const renegadeActions = {
    FETCH_RENEGADE_DATA: "FETCH_RENEGADE_DATA",
    STORE_RENEGADE_DATA: "STORE_RENEGADE_DATA",
}

export const fetchRenegadeData = () => ({ type: renegadeActions.FETCH_RENEGADE_DATA })

export const storeRenegadeData = (data) => ({
    type: renegadeActions.STORE_RENEGADE_DATA,
    data,
})
